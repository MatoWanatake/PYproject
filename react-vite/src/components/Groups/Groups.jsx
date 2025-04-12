import './Groups.css';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

function Groups({groups}) {
    //The HTML that makes up the component
    return (
        <div className={'groups'}>
            <ul>
                {groups.map(group => (
                    <li key={group.id}>
                        <Link to={`/example/group/${group.id}`}>
                            {group.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
Groups.propTypes = {
    groups: PropTypes.array.isRequired,
}

export default Groups;
