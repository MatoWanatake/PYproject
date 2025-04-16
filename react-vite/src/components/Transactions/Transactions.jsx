import './Transactions.css';
import {nanoid} from "nanoid";

function Transactions({data}) {
    //The HTML that makes up the component
    return (
        <div className="transactions">
            <h2>Expenses</h2>
            <ul>
                {
                    data.expenses.map(expense => (
                        <li key={nanoid()}>{JSON.stringify(expense)}</li>
                    ))
                }
            </ul>
            <h2>Debits</h2>
            <ul>
                {
                    data.debits.map(debit => (
                        <li key={nanoid()}>{JSON.stringify(debit)}</li>
                    ))
                }
            </ul>
            <h2>Credits</h2>
            <ul>
                {
                    data.credits.map(credit => (
                        <li key={nanoid()}>{JSON.stringify(credit)}</li>
                    ))
                }
            </ul>
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
Transactions.propTypes = {
    data: {
        expenses: Array.isRequired,
        debits: Array.isRequired,
        credits: Array.isRequired,
    }
};

export default Transactions;
