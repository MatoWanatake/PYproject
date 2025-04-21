import './Balance.css';
import {PROP_TYPE_BALANCE} from "../../../../redux/user.js";
import PropTypes from "prop-types";
import {toCurrency} from "../../../../utils.js";
import {Link} from "react-router-dom";

function Balance({name, id, group = false, transactions}) {
    //Filter out transactions that have no outstanding balance
    const unsettled = transactions.filter(transaction => transaction.total_amount - transaction.paid !== 0);

    //Early out if there are no outstanding balances
    if (unsettled.length === 0) return null;

    //The HTML that makes up the component
    return (
        <div className="balance">
            <header>
                <Link to={`/details/${group ? "group" : "friend"}/${id}`}>{name}</Link>
            </header>
            {unsettled.map(transaction => {
                //Get outstanding balance
                const outstanding = transaction.total_amount - transaction.paid;

                //Build message
                const message = outstanding > 0 ?
                    `I owe ${toCurrency(outstanding)}` : `I am owed ${toCurrency(Math.abs(outstanding))}`;

                return (
                    <div key={`${name} - ${transaction.action} - ${transaction.user_id}`}>
                        <p>{message}</p>
                    </div>
                )
            })}
            <hr/>
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
Balance.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    group: PropTypes.bool,
    transactions: PropTypes.arrayOf(PROP_TYPE_BALANCE).isRequired,
};

export default Balance;
