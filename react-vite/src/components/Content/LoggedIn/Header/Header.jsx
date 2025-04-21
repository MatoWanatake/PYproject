import './Header.css';
import {useModal} from "../../../../context/Modal.jsx";
import ExpenseFormModal from "../../../ExpenseFormModal";
import CreditFormModal from "../../../CreditFormModal";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getBalance} from "../../../../redux/user.js";
import {Link, useNavigate} from "react-router-dom";
import {toCurrency} from "../../../../utils.js";

function Header() {
    //Access redux
    const dispatch = useDispatch();

    //Get navigation hook
    const navigate = useNavigate();

    //Access modal handlers
    const {setModalContent} = useModal();

    //Get user from store
    const user = useSelector((store) => store.session.user);
    const balance = useSelector((store) => store.user.balance);

    //Add expense
    const add = event => {
        //Prevent default actions
        event.preventDefault();

        //Show modal
        setModalContent(<ExpenseFormModal/>);
    }

    //Pay expense
    const pay = event => {
        //Prevent default actions
        event.preventDefault();

        //Show modal
        setModalContent(<CreditFormModal/>);
    }

    //Abort if is not signed in otherwise load data
    useEffect(() => {
        //Abort if is not signed in
        if (!user) {
            navigate('/');
        }

        //Load data
        dispatch(getBalance())
    }, [navigate, dispatch, user])

    //The HTML that makes up the component
    return (
        <div className="header">
            <header>
                <div className="title">
                    <Link to="/">Dashboard</Link>
                </div>
                <div className="buttons">
                    <button onClick={add}>Add an Expense</button>
                    <button className="tertiary" onClick={pay}>Pay an Expense</button>
                </div>
            </header>
            <div className="details">
                <div className="detail">
                    <div className="title">Total Balance</div>
                    <div className="value">{toCurrency(balance.summary.net)}</div>
                </div>
                <div className="detail">
                    <div className="title">You Owe</div>
                    <div className="value">{toCurrency(balance.summary.owes)}</div>
                </div>
                <div className="detail">
                    <div className="title">You Are Owed</div>
                    <div className="value">{toCurrency(balance.summary.owed)}</div>
                </div>
                <div className="detail">
                    <div className="title">You Have Been Paid</div>
                    <div className="value">{toCurrency(balance.summary.been_paid)}</div>
                </div>
                <div className="detail">
                    <div className="title">You Have Paid</div>
                    <div className="value">{toCurrency(balance.summary.paid)}</div>
                </div>
            </div>
        </div>
    );
}

export default Header;
