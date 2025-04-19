import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import './Friendship.css';
import {useDispatch, useSelector} from "react-redux";
import {getFriends, getGroups} from "../../redux/user.js";
import Friends from "./Friends";
import Groups from "./Groups";

function Friendship() {
    //Access redux
    const dispatch = useDispatch();

    //Get navigation hook
    const navigate = useNavigate();

    //Get data from the store
    const user = useSelector((store) => store.session.user);
    const friends = useSelector((store) => store.user.friends);
    const groups = useSelector((store) => store.user.groups);

    //State
    const [active, setActive] = useState("friends");

    //Abort if is not signed in otherwise load data
    useEffect(() => {
        //Abort if is not signed in
        if (!user) {
            navigate('/');
        }

        //Load data
        dispatch(getGroups())
        dispatch(getFriends())
    }, [navigate, dispatch, user])

    //The HTML that makes up the component
    return (
        <div className="friendship">
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
            <hr/>
            <div className="container">
                {active === "friends" && (<Friends friends={friends}/>)}
                {active === "groups" && (<Groups groups={groups}/>)}
            </div>
        </div>
    );
}

export default Friendship;
