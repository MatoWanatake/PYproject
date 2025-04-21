import './Balances.css';
import PropTypes from "prop-types";
import Balance from "./Balance/index.js";
import {PROP_TYPE_BALANCE} from "../../../redux/user.js";

function Balances({balances}) {
    //The HTML that makes up the component
    return (
        <div className="balances">
            <header>Group Balances</header>
            {Object.entries(balances.group).map(([name, details]) => (
                <Balance key={name} name={name} id={details.id} group={true} transactions={details.transactions}/>))}
            <header>User Balances</header>
            {Object.entries(balances.user).map(([name, details]) => (
                <Balance key={name} name={name} id={details.id} transactions={details.transactions}/>))}
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
Balances.propTypes = {
    balances: PropTypes.shape({
        group: PropTypes.shape({
            [`${PropTypes.string.isRequired}`]: PropTypes.arrayOf(PROP_TYPE_BALANCE),
        }),
        user: PropTypes.shape({
            [`${PropTypes.string.isRequired}`]: PropTypes.arrayOf(PROP_TYPE_BALANCE),
        }),
    })
};

export default Balances;
