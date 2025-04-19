import './Header.css';
import {useModal} from "../../../../context/Modal.jsx";
import ExpenseFormModal from "../../../ExpenseFormModal";
import PaymentFormModal from "../../../PaymentFormModal";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getBalance} from "../../../../redux/user.js";
import {useNavigate} from "react-router-dom";
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
        setModalContent(<PaymentFormModal/>);
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
                <div className="title">Dashboard</div>
                <div className="buttons">
                    <button onClick={add}>Add an Expense</button>
                    <button className="tertiary" onClick={pay}>Pay an Expense</button>
                </div>
            </header>
            <div className="details">
                <div className="detail">
                    <div className="title">Total Balance</div>
                    <div className="value">{toCurrency(-balance.owe + balance.owed)}</div>
                </div>
                <div className="detail">
                    <div className="title">You Owe</div>
                    <div className="value">{toCurrency(balance.owe)}</div>
                </div>
                <div className="detail">
                    <div className="title">You Are Owed</div>
                    <div className="value">{toCurrency(balance.owed)}</div>
                </div>
            </div>
        </div>
    );
}

export default Header;
