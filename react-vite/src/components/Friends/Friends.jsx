import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFriends } from '../../redux/friends';
import './Friends.css';
import PropTypes from "prop-types";
import {useModal} from "../../context/Modal.jsx";
import FriendFormModal from "./FriendFormModal";
import Friend from "./Friend";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

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
function Friends() {
  const dispatch = useDispatch();

  // Accessing the friends list from Redux store
  const friends = useSelector((state) => state.friends);

  // Dispatch action to fetch friends when the component mounts
  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  return (
    <div className={'friends'}>
      <ul>
        {friends.map((friend) => (
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
