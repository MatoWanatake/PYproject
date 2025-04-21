import './Expenses.css';
import PropTypes from "prop-types";
import Expense from "./Expense";
import {PROP_TYPE_DEBIT, PROP_TYPE_EXPENSE} from "../../../redux/expense.js";
import {PROP_TYPE_USER} from "../../../redux/session.js";

function Expenses({user, expenses, debits, hidden = false}) {
    //Collect the debits by expense
    const expenseDebits = debits.reduce((accumulator, debit) => {
        //Initialize the expense entry if it doesn't exist
        if (!accumulator[debit.expense_id]) {
            accumulator[debit.expense_id] = [];
        }

        //Add debit to expense
        accumulator[debit.expense_id].push(debit);

        //Return the accumulator
        return accumulator;
    }, {});


    //The HTML that makes up the component
    return (
        <div className="expenses" hidden={hidden}>
            <header>Expenses</header>
            {(expenses.map(expense => {
                //Add debits to expense
                expense.debits = expenseDebits[expense.id] || [];

                //Render the expense
                return (
                    <Expense key={expense.id} user={user} expense={expense}/>
                )}))}
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
Expenses.propTypes = {
    user: PROP_TYPE_USER.isRequired,
    expenses: PropTypes.arrayOf(PROP_TYPE_EXPENSE).isRequired,
    debits: PropTypes.arrayOf(PROP_TYPE_DEBIT).isRequired,
    hidden: PropTypes.bool
}

export default Expenses;
