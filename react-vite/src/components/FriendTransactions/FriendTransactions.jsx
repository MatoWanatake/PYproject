import './FriendTransactions.css';
import Transactions from "../Transactions/index.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {getFriendTransactions, getGroupTransactions} from "../../redux/user.js";
import {useOnEvent} from "../../hooks/useOnEvent.js";
import {EVENT_PAYMENT_ADDED} from "../PaymentFormModal/CashPaymentFormModal/CashPaymentFormModal.jsx";
import {EVENT_ADD_EXPENSE} from "../ExpenseFormModal/ExpenseFormModal.jsx";

function FriendTransactions() {
    //Access redux
    const dispatch = useDispatch();

    //Get navigation hook
    const navigate = useNavigate();

    //Get path parameter
    const { id } = useParams();

    //Get data from the store
    const user = useSelector((store) => store.session.user);
    const transactions = useSelector((store) => store.user.transactions);

    //Set transactions
    const friend = transactions.friends[id] || {};

    //Abort if is not signed in otherwise load data
    useEffect(() => {
        //Abort if is not signed in
        if (!user) {
            navigate('/');
        }

        //Load data
        dispatch(getFriendTransactions(id))
    }, [navigate, dispatch, user, id])

    //Listen for expense added event
    useOnEvent(EVENT_ADD_EXPENSE, () => {
        dispatch(getGroupTransactions(id))
    })

    //Listen for payment added event
    useOnEvent(EVENT_PAYMENT_ADDED, () => {
        dispatch(getGroupTransactions(id))
    });

    //The HTML that makes up the component
    return (
        <div className="friend-transactions">
            {friend && <Transactions transactions={friend}/>}
        </div>
    );
}

export default FriendTransactions;
