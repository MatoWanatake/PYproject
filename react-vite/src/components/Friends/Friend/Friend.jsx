import './Friend.css';
import {NO_OP_FUNCTION} from "../../../utils.js";
import PropTypes from "prop-types";
import {FaCat} from "react-icons/fa6";

function Friend({name, click = NO_OP_FUNCTION}) {
    //The HTML that makes up the component
    return (
        <div className="item friend" onClick={click}>
            <FaCat className="icon"/>
            <span className="name">{name}</span>
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
Friend.propTypes = {
    name: PropTypes.string.isRequired,
    click: PropTypes.func,
}

export default Friend;
