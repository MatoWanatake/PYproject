import './Credits.css';
import PropTypes from "prop-types";
import Credit from "./Credit";

function Credits({credits, hidden = false}) {
    //The HTML that makes up the component
    return (
        <div className="credits" hidden={hidden}>
            <header>Credits</header>
            {(credits.map(credit => (<Credit key={credit.id} credit={credit}/>)))}
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
Credits.propTypes = {
    credits: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        paid_by: PropTypes.number.isRequired,
        paid_to: PropTypes.number.isRequired,
        group_id: PropTypes.number,
        amount: PropTypes.number.isRequired,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
    })),
    hidden: PropTypes.bool
}

export default Credits;
