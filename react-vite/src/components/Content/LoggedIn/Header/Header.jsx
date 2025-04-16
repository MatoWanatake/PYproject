import './Header.css';
import {useModal} from "../../../../context/Modal.jsx";
import ExpenseFormModal from "../../../Expense/ExpenseFormModal";
import PaymentFormModal from "../../../Expense/PaymentFormModal";

function Header() {
    //Access modal handlers
    const {setModalContent} = useModal();

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
                    <div className="value">$0.00</div>
                </div>
                <div className="detail">
                    <div className="title">You Owe</div>
                    <div className="value">$0.00</div>
                </div>
                <div className="detail">
                    <div className="title">You Are Owned</div>
                    <div className="value">$0.00</div>
                </div>
            </div>
        </div>
    );
}

export default Header;
