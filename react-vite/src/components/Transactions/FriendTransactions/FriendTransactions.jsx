import './FriendTransactions.css';
import Transactions from "../index.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {getFriendTransactions} from "../../../redux/user.js";

function FriendTransactions() {
    //Access redux
    const dispatch = useDispatch();

    //Get navigation hook
    const navigate = useNavigate();

    //Get path parameter
    const { id } = useParams();

    //Get data from store
    const user = useSelector((store) => store.session.user);
    const transactions = useSelector((store) => store.user.transactions);

    //Set transactions
    const friend = transactions.friends[id] || {};

    //Abort if not signed in otherwise load data
    useEffect(() => {
        //Abort if not signed in
        if (!user) {
            navigate('/');
        }

        //Load data
        dispatch(getFriendTransactions(id))
    }, [navigate, dispatch, user, id])

    //The HTML that makes up the component
    return (
        <div className="friend-transactions">
            <header>Transactions</header>
            {friend && <Transactions data={friend}/>}
        </div>
    );
}

export default FriendTransactions;
