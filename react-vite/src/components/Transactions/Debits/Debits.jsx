import './Debits.css';
import PropTypes from "prop-types";
import Debit from "./Debit";

function Debits({debits, hidden = false}) {
    //The HTML that makes up the component
    return (
        <div className="debits" hidden={hidden}>
            <header>Debits</header>
            {(debits.map(debit => (<Debit key={`${debit.expense_id}-${debit.user_id}`} debit={debit}/>)))}
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
Debits.propTypes = {
    debits: PropTypes.arrayOf(PropTypes.shape({
        expense_id: PropTypes.number.isRequired,
        amount: PropTypes.number.isRequired,
        user_id: PropTypes.number.isRequired,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
    })),
    hidden: PropTypes.bool
}

export default Debits;
