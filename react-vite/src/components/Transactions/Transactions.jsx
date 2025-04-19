import './Transactions.css';
import PropTypes from "prop-types";
import {sortArrayByKey} from "../../utils.js";
import Expenses from "./Expenses/index.js";
import Debits from "./Debits/index.js";
import Credits from "./Credits/index.js";
import Summary from "./Summary/index.js";

function Transactions({transactions}) {
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
            <Summary debits={totalDebits} credits={totalCredits} outstanding={outstanding}/>
            <Expenses expenses={expenses} hidden={outstanding === 0}/>
            <Debits debits={debits} hidden={outstanding === 0}/>
            <Credits credits={credits} hidden={outstanding === 0}/>
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
Transactions.propTypes = {
    transactions: PropTypes.shape({
        expenses: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            group_id: PropTypes.number,
            user_id: PropTypes.number.isRequired,
            created_at: PropTypes.string.isRequired,
            updated_at: PropTypes.string.isRequired,
        })),
        debits: PropTypes.arrayOf(PropTypes.shape({
            expense_id: PropTypes.number.isRequired,
            amount: PropTypes.number.isRequired,
            user_id: PropTypes.number.isRequired,
            created_at: PropTypes.string.isRequired,
            updated_at: PropTypes.string.isRequired,
        })),
        credits: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            paid_by: PropTypes.number.isRequired,
            paid_to: PropTypes.number.isRequired,
            group_id: PropTypes.number,
            amount: PropTypes.number.isRequired,
            created_at: PropTypes.string.isRequired,
            updated_at: PropTypes.string.isRequired,
        }))
    })
};

export default Transactions;
