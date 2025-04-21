import './Expense.css';
import PropTypes from "prop-types";
import Comments from "../../../Comments";
import {deleteExpense, PROP_TYPE_EXPENSE} from "../../../../redux/expense.js";
import {PROP_TYPE_USER} from "../../../../redux/session.js";
import {useDispatch} from "react-redux";
import {useModal} from "../../../../context/Modal.jsx";
import ExpenseFormModal from "../../../ExpenseFormModal/index.js";
import {EVENT_DELETE_EXPENSE} from "../../../ExpenseFormModal/ExpenseFormModal.jsx";
import {useSendEvent} from "../../../../hooks/useSendEvent.js";
import {toCurrency, toLocalDate} from "../../../../utils.js";

function Expense({user, expense, hidden = false}) {
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
        dispatch(deleteExpense(expense.id))
            .then(() => emitter(EVENT_DELETE_EXPENSE, expense))
    }

    //Edit
    const edit = (event) => {
        //Prevent default actions
        event.preventDefault();

        //Show modal
        setModalContent(<ExpenseFormModal expense={expense}/>)
    }

    //The HTML that makes up the component
    return (
        <div className="expense" hidden={hidden}>
            <div className="details">
                <p>{expense.title} for {toCurrency(expense.amount)} created on on {toLocalDate(expense.created_at)}</p>
            </div>
            <div className={user.id === expense.user_id ? "actions" : "actions hidden"}>
                <button className="important" onClick={remove}>Delete</button>
                <button className="tertiary" onClick={edit}>Edit</button>
            </div>
            <div className="comments">
                <header>Comments</header>
                <Comments expense_id={expense.id} />
            </div>
            <hr/>
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
Expense.propTypes = {
    user: PROP_TYPE_USER.isRequired,
    expense: PROP_TYPE_EXPENSE.isRequired,
    hidden: PropTypes.bool
}

export default Expense;
