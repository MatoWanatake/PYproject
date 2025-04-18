import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFriends } from '../../redux/friends';
import './Friends.css';

function Friends() {
    const dispatch = useDispatch();

    // Accessing the friends list from Redux store
    const friends = useSelector((state) => state.friends);

    // Dispatch action to fetch friends when the component mounts
    useEffect(() => {
      dispatch(fetchFriends());
    }, [dispatch]);

    //The HTML that makes up the component
    return (
        <div className={'friends'}>
            <ul>
                {friends.map(friend => (
                    <li key={friend.id}>
                        <Link to={`/friend/${friend.id}`}>
                            {friend.username}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default Friends;
