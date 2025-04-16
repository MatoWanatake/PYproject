import {Link} from 'react-router-dom';

import './Friends.css';
import PropTypes from "prop-types";

function Friends({friends}) {
    //The HTML that makes up the component
    return (
        <div className={'friends'}>
            <ul>
                {friends.map(friend => (
                    <li key={friend.id}>
                        <Link to={`/example/friend/${friend.id}`}>
                            {friend.username}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
Friends.propTypes = {
    friends: PropTypes.array.isRequired,
}

export default Friends;
