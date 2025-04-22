import {useNavigate, useParams} from 'react-router-dom';

import './GroupTransactions.css';
import {useEffect} from "react";
import Transactions from "../Transactions/index.js";
import {useDispatch, useSelector} from "react-redux";
import {getGroupTransactions} from "../../redux/user.js";
import {useOnEvent} from "../../hooks/useOnEvent.js";
import {
    EVENT_ADD_CREDIT,
    EVENT_DELETE_CREDIT,
    EVENT_EDIT_CREDIT
} from "../CreditFormModal/CreditCashFormModal/CreditCashFormModal.jsx";
import {EVENT_ADD_EXPENSE, EVENT_DELETE_EXPENSE, EVENT_EDIT_EXPENSE} from "../ExpenseFormModal/ExpenseFormModal.jsx";
import {getGroup} from "../../redux/group.js";


function GroupTransactions() {
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
    const allGroups = useSelector((store) => store.group.groups);
    const allTransactions = useSelector((store) => store.user.transactions);

    //Get group and transactions
    const group = allGroups[id] || null;
    const transactions = allTransactions.groups[id] || null;

    //Abort if is not signed in otherwise load data
    useEffect(() => {
        //Abort if is not signed in
        if (!user) {
            navigate('/');
        }

        //Load data
        dispatch(getGroup(id))
        dispatch(getGroupTransactions(id))
    }, [navigate, dispatch, user, id])

    //Listen for relevant events
    useOnEvent([EVENT_ADD_EXPENSE, EVENT_EDIT_EXPENSE, EVENT_DELETE_EXPENSE], (_, data) => {
        //Only load data if related to the page being viewed
        if (data?.group_id === id) {
            dispatch(getGroupTransactions(id))
        }
    })

    useOnEvent([EVENT_ADD_CREDIT, EVENT_EDIT_CREDIT, EVENT_DELETE_CREDIT], (_, data) => {
        //Only load data if related to the page being viewed
        if (data?.group_id === id) {
            dispatch(getGroupTransactions(id))
        }
    });

    //The HTML that makes up the component
    return (
        <div className="group-transactions">
            {group && transactions && <Transactions user={user} name={group.name} transactions={transactions}/>}
        </div>
    );
}

export default GroupTransactions;
