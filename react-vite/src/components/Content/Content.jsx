import './Content.css';
import LoggedOut from "./LoggedOut";
import PropTypes from "prop-types";
import LoggedIn from "./LoggedIn";

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
    user: PropTypes.object,
}

export default Content;
