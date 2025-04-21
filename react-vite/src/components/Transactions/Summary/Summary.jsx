import './Summary.css';
import {toCurrency} from "../../../utils.js";
import PropTypes from "prop-types";

function Summary({name, debits, credits, outstanding}) {
    //The HTML that makes up the component
    return (
        <div className="summary">
            <header>Summary for relationship with {name}</header>
            <div className="outstanding">
                <div>Total Debits</div>
                <div>{toCurrency(debits)}</div>
                <div>Total Credits</div>
                <div>{toCurrency(credits)}</div>
                <div>Total</div>
                <div>{toCurrency(outstanding)}</div>
            </div>
            <hr/>
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
Summary.propTypes = {
    name: PropTypes.string.isRequired,
    debits: PropTypes.number.isRequired,
    credits: PropTypes.number.isRequired,
    outstanding: PropTypes.number.isRequired,
}

export default Summary;
