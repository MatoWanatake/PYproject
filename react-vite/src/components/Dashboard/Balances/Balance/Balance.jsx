import './Balance.css';
import {PROP_TYPE_BALANCE} from "../../../../redux/user.js";
import PropTypes from "prop-types";
import {toCurrency} from "../../../../utils.js";

function Balance({name, transactions}) {
    //The HTML that makes up the component
    return (
        <div className="balance">
            <header>{name}</header>
            {transactions.map(transaction => (
                <p key={`${name} - ${transaction.action}`}>
                    {
                        transaction.action === "owed" ?
                            `I owe ${toCurrency(transaction.total_amount)}` :
                            `I am owed ${toCurrency(transaction.total_amount)}`
                    }
                </p>
            ))}
            <hr/>
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
Balance.propTypes = {
    name: PropTypes.string.isRequired,
    transactions: PropTypes.arrayOf(PROP_TYPE_BALANCE).isRequired,
};

export default Balance;
