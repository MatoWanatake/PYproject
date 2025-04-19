import './ExpenseFormModal.css';
import {useDispatch, useSelector} from "react-redux";
import {useModal} from "../../context/Modal.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getFriends, getGroups} from "../../redux/user.js";
import {getGroupMembers} from "../../redux/group.js";
import {nanoid} from "nanoid";
import {hasDuplicates} from "../../utils.js";
import {addExpense} from "../../redux/expense.js";
import {useSendEvent} from "../../hooks/useSendEvent.js";

export const EVENT_ADD_EXPENSE = "add-expense";

function ExpenseFormModal() {
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
    const [title, setTitle] = useState("");
    const [group, setGroup] = useState("");
    const [amount, setAmount] = useState(0.00);
    const [debits, setDebits] = useState({[nanoid()]: {user_id: "", amount: ""}});
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
        const post = {
            title,
            amount: parseFloat(amount),
            debits: values.map((debit) => ({
                user_id: parseInt(debit.user_id),
                amount: parseFloat(debit.amount)
            })),
            group_id: group
        }

        //Persist
        dispatch(addExpense(post))
            .then(() => emitter(EVENT_ADD_EXPENSE))
            .then(() => closeModal())
            .catch(response => {
                console.log(response);

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
    }, [navigate, dispatch, user])

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
                            <button type="button" className="text" onClick={() => removeDebit(id)}>
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
                    <button type="submit">Save</button>
                    <button className="tertiary" onClick={cancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default ExpenseFormModal;
