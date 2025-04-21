import './FriendTransactions.css';
import Transactions from "../Transactions/index.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {getFriendTransactions} from "../../redux/user.js";
import {useOnEvent} from "../../hooks/useOnEvent.js";
import {
    EVENT_ADD_CREDIT,
    EVENT_DELETE_CREDIT,
    EVENT_EDIT_CREDIT
} from "../CreditFormModal/CreditCashFormModal/CreditCashFormModal.jsx";
import {EVENT_ADD_EXPENSE, EVENT_DELETE_EXPENSE, EVENT_EDIT_EXPENSE} from "../ExpenseFormModal/ExpenseFormModal.jsx";
import {getFriend} from "../../redux/friend.js";

function FriendTransactions() {
    //Access redux
    const dispatch = useDispatch();

    //Get navigation hook
    const navigate = useNavigate();

    //Get path parameters
    const params = useParams();
    const {id} = ((params) => {
        return {
            id: params.id ? parseInt(params.id) : null
        }
    })(params)

    //Get data from the store
    const user = useSelector((store) => store.session.user);
    const allFriends = useSelector((store) => store.friend.friends);
    const allTransactions = useSelector((store) => store.user.transactions);

    //Get friend and transactions
    const friend = allFriends[id] || null;
    const transactions = allTransactions.friends[id] || null;

    //Abort if is not signed in otherwise load data
    useEffect(() => {
        //Abort if is not signed in
        if (!user) {
            navigate('/');
        }

        //Abort if trying to view yourself
        if (user.id === id) {
            navigate('/');
        }

        //Load data
        dispatch(getFriend(id))
        dispatch(getFriendTransactions(id))
    }, [navigate, dispatch, user, id])

    //Listen for relevant events
    useOnEvent([EVENT_ADD_EXPENSE, EVENT_EDIT_EXPENSE, EVENT_DELETE_EXPENSE], (_, data) => {
        //Only load data if related to the page being viewed
        //Since expenses are made by the currently logged-in user, if we are viewing the currently logged-in
        //user's transactions reload the data. If the expense had a debit added to the user being viewed, reload the
        //data.
        if (user.id === id || data.debits.find(debit => debit.user_id === id)) {
            dispatch(getFriendTransactions(id))
        }
    })

    useOnEvent([EVENT_ADD_CREDIT, EVENT_EDIT_CREDIT, EVENT_DELETE_CREDIT], (_, data) => {
        //Only load data if related to the page being viewed
        //Since payments are made by the currently logged-in user, if we are viewing the currently logged-in
        //user's transactions reload the data. If the payment was made to the user being viewed, reload the
        //data.
        if (user.id === id || data.paid_to === id) {
            dispatch(getFriendTransactions(id))
        }
    });

    //The HTML that makes up the component
    return (
        <div className="friend-transactions">
            {friend && transactions &&
                <Transactions user={user} name={friend.username} transactions={transactions}/>}
        </div>
    );
}

export default FriendTransactions;
