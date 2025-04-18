import './Group.css';
import {GiCat} from "react-icons/gi";
import PropTypes from "prop-types";
import {NO_OP_FUNCTION} from "../../../../utils.js";

function Group({name, click = NO_OP_FUNCTION}) {
    //The HTML that makes up the component
    return (
        <div className="item group" onClick={click}>
            <GiCat className="icon"/>
            <span className="name">{name}</span>
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
Group.propTypes = {
    name: PropTypes.string.isRequired,
    click: PropTypes.func,
}

export default Group;
