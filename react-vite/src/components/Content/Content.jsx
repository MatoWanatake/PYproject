import './Content.css';
import LoggedOut from "./LoggedOut/index.js";
import PropTypes from "prop-types";
import LoggedIn from "./LoggedIn/index.js";

function Content({user}) {
    //Show splash image if user is logged out
    if (user === null) return (<LoggedOut/>)

    //The HTML that makes up the component
    return (
        <LoggedIn/>
    );
}

// https://www.npmjs.com/package/prop-types
Content.propTypes = {
    user: PropTypes.object.isRequired,
}

export default Content;
