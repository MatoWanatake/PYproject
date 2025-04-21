import './Credit.css';
import PropTypes from "prop-types";
import {PROP_TYPE_USER} from "../../../../redux/session.js";
import {deleteCredit, PROP_TYPE_CREDIT} from "../../../../redux/credit.js";
import {useDispatch} from "react-redux";
import {useModal} from "../../../../context/Modal.jsx";
import CreditCashFormModal from "../../../CreditFormModal/CreditCashFormModal";
import {EVENT_DELETE_CREDIT} from "../../../CreditFormModal/CreditCashFormModal/CreditCashFormModal.jsx";
import {useSendEvent} from "../../../../hooks/useSendEvent.js";
import {toCurrency, toLocalDate} from "../../../../utils.js";

function Credit({user, credit, hidden = false}) {
    //Get event bus
    const emitter = useSendEvent();

    //Access redux
    const dispatch = useDispatch();

    //Access modal handlers
    const {setModalContent} = useModal();

    //Remove
    const remove = (event) => {
        //Prevent default actions
        event.preventDefault();

        //Persist
        dispatch(deleteCredit(credit.id))
            .then(() => emitter(EVENT_DELETE_CREDIT, credit));
    }

    //Edit
    const edit = (event) => {
        //Prevent default actions
        event.preventDefault();

        //Show modal
        setModalContent(<CreditCashFormModal id={credit.id} credit={credit}/>)
    }

    //The HTML that makes up the component
    return (<div className="credit" hidden={hidden}>
            <p>
                {credit.user_paid_by.username} paid {credit.user_paid_to.username} {toCurrency(credit.amount)} on {toLocalDate(credit.updated_at)}
            </p>
            <div className={user.id === credit.paid_by ? "actions" : "actions hidden"}>
                <button className="important" onClick={remove}>Delete</button>
                <button className="tertiary" onClick={edit}>Edit</button>
            </div>
            <hr/>
        </div>);
}

// https://www.npmjs.com/package/prop-types
Credit.propTypes = {
    user: PROP_TYPE_USER.isRequired, credit: PROP_TYPE_CREDIT.isRequired, hidden: PropTypes.bool
}

export default Credit;
