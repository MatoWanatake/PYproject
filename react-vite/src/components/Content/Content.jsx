import './Content.css';
import LoggedOut from "./LoggedOut";
import LoggedIn from "./LoggedIn";
import {PROP_TYPE_USER} from "../../redux/session.js";

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
    user: PROP_TYPE_USER,
}

export default Content;
