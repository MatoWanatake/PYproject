import './Debit.css';
import PropTypes from "prop-types";
import {PROP_TYPE_USER} from "../../../../redux/session.js";
import {PROP_TYPE_DEBIT} from "../../../../redux/expense.js";
import {toCurrency} from "../../../../utils.js";

function Debit({user, debit, hidden = false}) {
    //The HTML that makes up the component
    return (
        <div className="debit" hidden={hidden}>
            <p>
                <span>{debit.user.id === user.id ? "You owe" : `${debit.user.username} owes`} </span>
                <span>{toCurrency(debit.amount)} for expense {debit.expense.title}</span>
            </p>
            <hr/>
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
Debit.propTypes = {
    user: PROP_TYPE_USER.isRequired,
    debit: PROP_TYPE_DEBIT.isRequired,
    hidden: PropTypes.bool
}

export default Debit;
