import './Expense.css';
import PropTypes from "prop-types";
import Comments from "../../../Comments";

function Expense({expense, hidden = false}) {
    //The HTML that makes up the component
    return (
        <div className="expense" hidden={hidden}>
            <div className="details">
                <p>{JSON.stringify(expense)}</p>
            </div>
            <div className="comments">
                <Comments expense_id={expense.id} />
            </div>
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
Expense.propTypes = {
    expense: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        group_id: PropTypes.number,
        user_id: PropTypes.number.isRequired,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
    }),
    hidden: PropTypes.bool
}

export default Expense;
