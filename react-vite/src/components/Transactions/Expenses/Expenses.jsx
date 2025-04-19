import './Expenses.css';
import PropTypes from "prop-types";
import Expense from "./Expense";

function Expenses({expenses, hidden = false}) {
    //The HTML that makes up the component
    return (
        <div className="expenses" hidden={hidden}>
            <header>Expenses</header>
            {(expenses.map(expense => (<Expense key={expense.id} expense={expense}/>)))}
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
Expenses.propTypes = {
    expenses: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        group_id: PropTypes.number,
        user_id: PropTypes.number.isRequired,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
    })),
    hidden: PropTypes.bool
}

export default Expenses;
