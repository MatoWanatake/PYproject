import './Friends.css';
import PropTypes from "prop-types";
import {useModal} from "../../../context/Modal.jsx";
import FriendFormModal from "./FriendFormModal";
import Friend from "./Friend";
import {Link} from "react-router-dom";

function Friends({friends}) {
    //Access modal handlers
    const {setModalContent} = useModal();

    //Add friend
    const friend = event => {
        //Prevent default actions
        event.preventDefault();

        //Show modal
        setModalContent(<FriendFormModal/>)
    }

    //The HTML that makes up the component
    return (
        <div className="friends">
            {friends.map(friend => (
                <Link key={friend.id} to={`/details/friend/${friend.id}`}>
                    <Friend key={friend.id} name={friend.username}/>
                </Link>
            ))}
            <Friend name="Add a Friend" click={friend}/>
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
Friends.propTypes = {
    friends: PropTypes.array.isRequired,
}

export default Friends;
