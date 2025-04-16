import './CashPaymentFormModal.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useModal} from "../../../context/Modal.jsx";
import {getFriends, getGroups} from "../../../redux/user.js";
import {addCredit} from "../../../redux/credit.js";

function CashPaymentFormModal() {
    //Access redux
    const dispatch = useDispatch();

    //Get navigation hook
    const navigate = useNavigate();

    //Get data from store
    const user = useSelector((store) => store.session.user);
    const friends = useSelector((store) => store.user.friends);
    const groups = useSelector((store) => store.user.groups);

    //Access modal handlers
    const {closeModal} = useModal();

    //State
    const [friend, setFriend] = useState("");
    const [amount, setAmount] = useState(0.00);
    const [group, setGroup] = useState("");
    const [errors, setErrors] = useState({});

    //Submit
    const handleSubmit = async (event) => {
        //Prevent default actions
        event.preventDefault();

        //Persist
        dispatch(addCredit({
            friendId: friend,
            amount: amount,
            groupId: group,
        }))
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

    //Abort if not signed in otherwise load data
    useEffect(() => {
        //Abort if not signed in
        if (!user) {
            navigate('/');
        }

        //Load data
        dispatch(getFriends())
        dispatch(getGroups())
    }, [navigate, dispatch, user])

    //The HTML that makes up the component
    return (
        <div className="cash-payment-form-modal">
            <header>Cash Payment</header>
            <form className="form" onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="friend">Friend</label>
                    <select
                        name="friend"
                        value={friend}
                        onChange={(event) => setFriend(event.target.value)}
                        required
                    >
                        {friends.map(friend => (
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
                <div className="row">
                    <label htmlFor="group">Group</label>
                    <select
                        name="group"
                        value={group}
                        onChange={(event) => setGroup(event.target.value)}
                        required
                    >
                        <option value="">None</option>
                        {groups.map(group => (
                            <option key={group.id} value={group.id}>{group.name}</option>
                        ))}
                    </select>
                    {errors.group && <p className="error">{errors.group}</p>}
                </div>
                <div className="row full">
                    <button type="submit">Save</button>
                    <button onClick={cancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default CashPaymentFormModal;
