import './Credits.css';
import PropTypes from "prop-types";
import Credit from "./Credit";
import {PROP_TYPE_CREDIT} from "../../../redux/credit.js";
import {PROP_TYPE_USER} from "../../../redux/session.js";

function Credits({user, credits, hidden = false}) {
    //The HTML that makes up the component
    return (
        <div className="credits" hidden={hidden}>
            <header>Credits</header>
            {(credits.map(credit => (<Credit key={credit.id} user={user} credit={credit}/>)))}
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
Credits.propTypes = {
    user: PROP_TYPE_USER.isRequired,
    credits: PropTypes.arrayOf(PROP_TYPE_CREDIT).isRequired,
    hidden: PropTypes.bool
}

export default Credits;
