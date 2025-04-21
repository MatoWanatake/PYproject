import './Transactions.css';
import PropTypes from "prop-types";
import {sortArrayByKey} from "../../utils.js";
import Expenses from "./Expenses/index.js";
import Debits from "./Debits/index.js";
import Credits from "./Credits/index.js";
import Summary from "./Summary/index.js";
import {PROP_TYPE_DEBIT, PROP_TYPE_EXPENSE} from "../../redux/expense.js";
import {PROP_TYPE_CREDIT} from "../../redux/credit.js";
import {PROP_TYPE_USER} from "../../redux/session.js";

function Transactions({user, name, transactions}) {
    //Get the expenses
    const expenses = sortArrayByKey(
        transactions.expenses || [],
        "updated_at",
        value => new Date(value)
    );

    //Get the total amount paid for friends
    const debits = sortArrayByKey(
        transactions.debits || [],
        "updated_at",
        value => new Date(value)
    );
    const totalDebits = debits.reduce((total, debit) => total + debit.amount, 0);

    //Get the total amount paid by friends
    const credits = sortArrayByKey(
        transactions.credits || [],
        "updated_at",
            value => new Date(value)
    );
    const totalCredits = credits.reduce((total, credit) => total + credit.amount, 0);

    //Calculate outstanding balance
    const outstanding = totalDebits - totalCredits;

    //The HTML that makes up the component
    return (
        <div className="transactions">
            <Summary user={user} name={name} debits={totalDebits} credits={totalCredits} outstanding={outstanding}/>
            <Expenses user={user} expenses={expenses} debits={debits} hidden={outstanding === 0}/>
            <Debits user={user} debits={debits} hidden={outstanding === 0}/>
            <Credits user={user} credits={credits} hidden={outstanding === 0}/>
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
Transactions.propTypes = {
    user: PROP_TYPE_USER.isRequired,
    name: PropTypes.string.isRequired,
    transactions: PropTypes.shape({
        expenses: PropTypes.arrayOf(PROP_TYPE_EXPENSE).isRequired,
        debits: PropTypes.arrayOf(PROP_TYPE_DEBIT).isRequired,
        credits: PropTypes.arrayOf(PROP_TYPE_CREDIT).isRequired
    })
};

export default Transactions;
