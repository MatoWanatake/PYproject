import './Summary.css';
import {toCurrency} from "../../../utils.js";
import PropTypes from "prop-types";

function Summary({debits, credits, outstanding}) {
    //The HTML that makes up the component
    return (
        <div className="summary">
            <header>Summary</header>
            <div className="outstanding">
                <div>Total Debits</div>
                <div>{toCurrency(debits)}</div>
                <div>Total Credits</div>
                <div>{toCurrency(credits)}</div>
                <div>Total</div>
                <div>{toCurrency(outstanding)}</div>
            </div>
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
Summary.propTypes = {
    debits: PropTypes.number.isRequired,
    credits: PropTypes.number.isRequired,
    outstanding: PropTypes.number.isRequired,
}

export default Summary;
