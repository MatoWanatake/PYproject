import './Debits.css';
import PropTypes from "prop-types";
import Debit from "./Debit";
import {PROP_TYPE_USER} from "../../../redux/session.js";
import {PROP_TYPE_DEBIT} from "../../../redux/expense.js";

function Debits({user, debits, hidden = false}) {
    //The HTML that makes up the component
    return (
        <div className="debits" hidden={hidden}>
            <header>Who Owes</header>
            {(debits.map(debit => (<Debit key={`${debit.expense_id}-${debit.user_id}`} user={user} debit={debit}/>)))}
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
Debits.propTypes = {
    user: PROP_TYPE_USER.isRequired,
    debits: PropTypes.arrayOf(PROP_TYPE_DEBIT).isRequired,
    hidden: PropTypes.bool
}

export default Debits;
