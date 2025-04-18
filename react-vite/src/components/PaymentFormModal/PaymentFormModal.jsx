import './PaymentFormModal.css';
import {useModal} from "../../context/Modal.jsx";
import CashPaymentFormModal from "./CashPaymentFormModal/index.js";
import venmoImage from "./venmo_logo.png";
import paypalImage from "./paypal_logo.png";

function PaymentFormModal() {
    //Access modal handlers
    const {setModalContent, closeModal} = useModal();

    //Cash
    const cash = event => {
        //Prevent default actions
        event.preventDefault();

        //Update modal
        setModalContent(<CashPaymentFormModal/>);
    }

    //Venmo
    const venmo = event => {
        //Prevent default actions
        event.preventDefault();

        //Coming soon
        alert("Venmo coming soon!");
    }

    //Paypal
    const paypay = event => {
        //Prevent default actions
        event.preventDefault();

        //Coming soon
        alert("Paypal Coming soon!");
    }

    //Cancel
    const cancel = (event) => {
        //Prevent default actions
        event.preventDefault();

        //Close modal
        closeModal();
    }

    //The HTML that makes up the component
    return (
        <div className="payment-form-modal">
            <header>Pay an Expense</header>
            <p>Choose a payment method</p>
            <div className="form">
                <div className="row full">
                    <button className="cash" onClick={cash}>Record a cash payment</button>
                </div>
                <div className="row full">
                    <button className="image-button venmo" onClick={venmo}>
                        <img src={venmoImage} alt="Venmo"/>
                    </button>
                </div>
                <div className="row full">
                    <button className="image-button paypal" onClick={paypay}>
                        <img src={paypalImage} alt="Paypal"/>
                    </button>
                </div>
                <div className="row full">
                    <button className="tertiary" onClick={cancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default PaymentFormModal;
