import './CreditCashFormModal.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useModal} from "../../../context/Modal.jsx";
import {getFriends, getGroups} from "../../../redux/user.js";
import {addCredit, editCredit, PROP_TYPE_CREDIT} from "../../../redux/credit.js";
import {getGroupMembers} from "../../../redux/group.js";
import {useSendEvent} from "../../../hooks/useSendEvent.js";
import {isNotNullOrEmpty} from "../../../utils.js";

export const EVENT_ADD_CREDIT = "credit-added";
export const EVENT_EDIT_CREDIT = "credit-added";
export const EVENT_DELETE_CREDIT = "credit-added";

function CreditCashFormModal({credit}) {
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
    const [group, setGroup] = useState(credit?.group_id || "");
    const [friend, setFriend] = useState(credit?.paid_to || "");
    const [amount, setAmount] = useState(credit?.amount || 0.00);
    const [errors, setErrors] = useState({});

    //Set friends
    const friendOptions = group ? members[group] || [] : userFriends || [];

    //Group
    const groupChanged = (event) => {
        //Get group
        const group = event.target.value;

        //Update group
        setGroup(group)

        //Clear current friend selection
        setFriend("")

        //Load group members when a group is selected
        if (group) {
            dispatch(getGroupMembers(group))
        }
    }

    //Submit
    const handleSubmit = async (event) => {
        //Prevent default actions
        event.preventDefault();

        //Persist
        const data = {
            paid_to: parseInt(friend),
            amount: parseFloat(amount),
            group_id: isNotNullOrEmpty(group) ? parseInt(group) : null,
        }

        const promise =
            credit?.id ?
                //Update
                dispatch(editCredit({id: credit.id, ...data})) :

                //New
                dispatch(addCredit(data));

        promise
            .then(() => emitter(credit?.id ? EVENT_EDIT_CREDIT : EVENT_ADD_CREDIT, data))
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
    }, [navigate, dispatch, user])

    //The HTML that makes up the component
    return (
        <div className="cash-credit-form-modal">
            <header>Cash Payment</header>
            <form className="form" onSubmit={handleSubmit}>
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
                    <label htmlFor="friend">Friend</label>
                    <select
                        name="friend"
                        value={friend}
                        onChange={(event) => setFriend(event.target.value)}
                        required
                    >
                        <option value="">Select a Friend</option>
                        {friendOptions.map(friend => (
                            <option key={friend.id} value={friend.id}>{friend.username}</option>
                        ))}
                    </select>
                    {errors.friend && <p className="error">{errors.friend}</p>}
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
                <div className="row full buttons">
                    <button className="tertiary" onClick={cancel}>Cancel</button>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
CreditCashFormModal.propTypes = {
    credit: PROP_TYPE_CREDIT
}

export default CreditCashFormModal;
