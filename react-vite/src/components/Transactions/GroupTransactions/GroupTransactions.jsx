import {useNavigate, useParams} from 'react-router-dom';

import './GroupTransactions.css';
import {useEffect} from "react";
import Transactions from "../index.js";
import {useDispatch, useSelector} from "react-redux";
import {getGroupTransactions} from "../../../redux/user.js";

function GroupTransactions() {
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
    const group = transactions.groups[id] || {};

    //Abort if not signed in otherwise load data
    useEffect(() => {
        //Abort if not signed in
        if (!user) {
            navigate('/');
        }

        //Load data
        dispatch(getGroupTransactions(id))
    }, [navigate, dispatch, user, id])

    //The HTML that makes up the component
    return (
        <div className="group-transactions">
            <header>Transactions</header>
            {group && <Transactions data={group}/>}
        </div>
    );
}

export default GroupTransactions;
