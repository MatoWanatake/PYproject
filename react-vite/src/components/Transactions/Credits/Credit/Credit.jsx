import './Credit.css';
import PropTypes from "prop-types";

function Credit({credit, hidden = false}) {
    //The HTML that makes up the component
    return (
        <div className="credit" hidden={hidden}>
            <p>{JSON.stringify(credit)}</p>
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
Credit.propTypes = {
    credit: PropTypes.shape({
        id: PropTypes.number.isRequired,
        paid_by: PropTypes.number.isRequired,
        paid_to: PropTypes.number.isRequired,
        group_id: PropTypes.number,
        amount: PropTypes.number.isRequired,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
    }),
    hidden: PropTypes.bool
}

export default Credit;
