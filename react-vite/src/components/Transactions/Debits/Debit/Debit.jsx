import './Debit.css';
import PropTypes from "prop-types";

function Debit({debit, hidden = false}) {
    //The HTML that makes up the component
    return (
        <div className="debit" hidden={hidden}>
            <p>{JSON.stringify(debit)}</p>
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
Debit.propTypes = {
    debit: PropTypes.shape({
        expense_id: PropTypes.number.isRequired,
        amount: PropTypes.number.isRequired,
        user_id: PropTypes.number.isRequired,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
    }),
    hidden: PropTypes.bool
}

export default Debit;
