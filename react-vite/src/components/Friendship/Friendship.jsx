import {Suspense, useEffect, useState} from 'react';
import {Await, useLoaderData, useNavigate} from 'react-router-dom';

import './Friendship.css';
import {useSelector} from "react-redux";
import {FaCat} from "react-icons/fa6";
import {GiCat} from "react-icons/gi";
import {useModal} from "../../context/Modal.jsx";
import FriendForm from "./FriendForm/index.js";
import GroupForm from "./GroupForm/index.js";

function Friendship() {
    //Access modal handlers
    const {setModalContent} = useModal();

    //Get navigation hook
    const navigate = useNavigate();

    //Get data from the loader
    const data = useLoaderData();

    //Get user from store
    const user = useSelector((store) => store.session.user);

    //State
    const [active, setActive] = useState("friends");

    //Add friend
    const friend = event => {
        //Prevent default actions
        event.preventDefault();

        //Show modal
        setModalContent(<FriendForm/>)
    }

    //Add Group
    const group = event => {
        //Prevent default actions
        event.preventDefault();

        //Show modal
        setModalContent(<GroupForm/>)
    }

    //Abort if not signed in
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [navigate, user])

    //The HTML that makes up the component
    return (
        <div className={'friendship'}>
            <header>
                <button
                    className={`text ${active === "friends" ? "active" : ""}`}
                    onClick={() => setActive("friends")}
                >
                    Friends
                </button>
                <button
                    className={`text ${active === "groups" ? "active" : ""}`}
                    onClick={() => setActive("groups")}
                >
                    Groups
                </button>
            </header>
            <hr />
            <div className="container">
                {active === "friends" && (
                    <div className="grid friends">
                        <Suspense>
                            <Await resolve={data.friends}>
                                {friends => friends.map(friend => (
                                    <div key={friend.id} className="item friend">
                                        <FaCat className="icon" />
                                        <span className="name">{friend.username}</span>
                                    </div>
                                ))}
                            </Await>
                        </Suspense>
                        <div className="item friend add" onClick={friend}>
                            <FaCat className="icon" />
                            <span className="name">Add a Friend</span>
                        </div>
                    </div>
                )}
                {active === "groups" && (
                    <div className="grid groups">
                        <Suspense>
                            <Await resolve={data.groups}>
                                {groups => groups.map(group => (
                                    <div key={group.id} className="item group">
                                        <GiCat className="icon" />
                                        <span className="name">{group.name}</span>
                                    </div>
                                ))}
                            </Await>
                            <div className="item group add" onClick={group}>
                                <GiCat className="icon" />
                                <span className="name">Create a Group</span>
                            </div>
                        </Suspense>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Friendship;
