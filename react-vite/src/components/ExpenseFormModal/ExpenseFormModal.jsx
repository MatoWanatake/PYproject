import './ExpenseFormModal.css';
import {useDispatch, useSelector} from "react-redux";
import {useModal} from "../../context/Modal.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getFriends, getGroups} from "../../redux/user.js";
import {getGroupMembers} from "../../redux/group.js";
import {nanoid} from "nanoid";
import {hasDuplicates, isNotNullOrEmpty} from "../../utils.js";
import {addExpense, editExpense, PROP_TYPE_EXPENSE} from "../../redux/expense.js";
import {useSendEvent} from "../../hooks/useSendEvent.js";

export const EVENT_ADD_EXPENSE = "add-expense";
export const EVENT_EDIT_EXPENSE = "edit-expense";
export const EVENT_DELETE_EXPENSE = "add-expense";

function toDebitState(debits) {
    if (debits.length === 0) {
        return {[nanoid()]: {user_id: "", amount: ""}}
    }

    return debits.reduce((accumulator, debit) => {
        accumulator[nanoid()] = {
            user_id: debit.user_id,
            amount: debit.amount,
        };

        return accumulator;
    }, {});
}

function ExpenseFormModal({expense}) {
    //Get event bus
    const emitter = useSendEvent();

    //Access redux
    const dispatch = useDispatch();

    //Get navigation hook
    const navigate = useNavigate();

    //Get data from the store
    const user = useSelector((store) => store.session.user);
    const userFriends = useSelector((store) => store.user.friends);
    const groups = useSelector((store) => store.user.groups);
    const members = useSelector((store) => store.group.members)

    //Access modal handlers
    const {closeModal} = useModal();

    //State
    const [title, setTitle] = useState(expense?.title || "");
    const [group, setGroup] = useState(expense?.group_id || "");
    const [amount, setAmount] = useState(expense?.amount || 0.00);
    const [debits, setDebits] = useState(toDebitState(expense?.debits || []));
    const [errors, setErrors] = useState({});

    //Set friends
    const friendOptions = group ? members[group] || [] : userFriends || [];

    //Group
    const groupChanged = (event) => {
        //Get group
        const group = event.target.value;

        //Update group
        setGroup(group)

        //Load group members when a group is selected
        if (group) {
            dispatch(getGroupMembers(group))
        }
    }

    const addDebit = () => {
        setDebits({...debits, [nanoid()]: {user_id: "", amount: ""}});
    };

    const debitChange = (id, field, value) => {
        //Make a copy of the debits
        const updated = {...debits};

        //Update value
        updated[id][field] = value;

        //Update state
        setDebits(updated);
    };

    const removeDebit = (id) => {
        //Make a copy of the debits
        const updated = {...debits};

        //Delete remove debit
        delete updated[id];

        //Update state
        setDebits(updated);
    };

    //Submit
    const handleSubmit = async (event) => {
        //Prevent default actions
        event.preventDefault();

        //Get debits
        const values = Object.values(debits);

        //Validate
        if (amount <= 0) {
            setErrors({amount: "Amount must be greater than 0"});
            return;
        }

        if (values.length === 0) {
            setErrors({debits: "At least one debit is required"});
            return;
        }

        if (hasDuplicates(values, "user_id")) {
            setErrors({debits: "A friend cannot be debited more than once"});
            return;
        }

        const sum = values.reduce((sum, item) => sum + parseFloat(item.amount), 0);
        if (sum > parseFloat(amount)) {
            setErrors({debits: "The sum of all debits must be less than or equal to the expense amount"});
            return;
        }

        //Persist
        const data = {
            title,
            amount: parseFloat(amount),
            debits: values.map((debit) => ({
                user_id: parseInt(debit.user_id),
                amount: parseFloat(debit.amount)
            })),
            group_id: isNotNullOrEmpty(group) ? parseInt(group) : null,
        }

        const promise =
            expense?.id ?
                //Update
                dispatch(editExpense({id: expense.id, ...data})) :

                //New
                dispatch(addExpense(data));

        promise
            .then(() => emitter(expense?.id ? EVENT_EDIT_EXPENSE : EVENT_ADD_EXPENSE, data))
            .then(() => closeModal())
            .catch(response => {
                response.json()
                    .then(json => setErrors(json))
            });
    };

    //Cancel
    const cancel = (event) => {
        //Prevent default actions
        event.preventDefault();

        //Close modal
        closeModal();
    }

    //Abort if is not signed in otherwise load data
    useEffect(() => {
        //Abort if is not signed in
        if (!user) {
            navigate('/');
        }

        //Load data
        dispatch(getGroups())
        dispatch(getFriends())

        //If a group is set (edit mode) load group members
        if (expense?.group_id) {
            dispatch(getGroupMembers(expense.group_id))
        }
    }, [navigate, dispatch, user, expense])

    //The HTML that makes up the component
    return (
        <div className="expense-form-modal">
            <header>Create an Expense</header>
            <form className="form" onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input
                        name="title"
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Title"
                        required
                    />
                    {errors.title && <p className="error">{errors.title}</p>}
                </div>
                <div className="row">
                    <label htmlFor="group">Group</label>
                    <select
                        name="group"
                        value={group}
                        onChange={groupChanged}
                    >
                        <option value="">None</option>
                        {groups.map(group => (
                            <option key={group.id} value={group.id}>{group.name}</option>
                        ))}
                    </select>
                    {errors.group && <p className="error">{errors.group}</p>}
                </div>
                <div className="row">
                    <label htmlFor="amount">Amount</label>
                    <input
                        name="amount"
                        type="number"
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}
                        required
                        placeholder="Amount"
                    />
                    {errors.amount && <p className="error">{errors.amount}</p>}
                </div>
                <div className="row debits">
                    {Object.entries(debits).map(([id, debit]) => (
                        <div key={id} className="row debit">
                            <div>
                                <label htmlFor="friend">Friend</label>
                                <select
                                    name="friend"
                                    value={debit.user_id}
                                    onChange={(event) => debitChange(id, "user_id", event.target.value)}
                                    required
                                >
                                    <option value="">Select a Friend</option>
                                    {friendOptions.map(friend => (
                                        <option key={friend.id} value={friend.id}>{friend.username}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="amount">Amount</label>
                                <input
                                    name="amount"
                                    type="number"
                                    value={debit.amount}
                                    onChange={(event) => debitChange(id, "amount", event.target.value)}
                                    required
                                    placeholder="Amount"
                                />
                            </div>
                            <button type="button" className="important" onClick={() => removeDebit(id)}>
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addDebit}>
                        Add Debit
                    </button>
                    {errors.debits && <p className="error">{errors.debits}</p>}
                </div>
                <div className="row full buttons">
                    <button className="tertiary" onClick={cancel}>Cancel</button>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
ExpenseFormModal.propTypes = {
    expense: PROP_TYPE_EXPENSE
}

export default ExpenseFormModal;
