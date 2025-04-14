import "./Navigation.css";
import {useModal} from "../../context/Modal.jsx";
import LoginFormModal from "../LoginFormModal/index.js";
import SignupFormModal from "../SignupFormModal/index.js";
import {useDispatch, useSelector} from "react-redux";
import {FaAngleDown, FaUserCircle} from "react-icons/fa";
import {Link} from "react-router-dom";
import {useState} from "react";
import {thunkLogout} from "../../redux/session.js";

function Navigation() {
    const dispatch = useDispatch();

    const {closeMenu, setModalContent} = useModal();

    const [hidden, setHidden] = useState(true);

    const user = useSelector((store) => store.session.user);

    const login = () => {
        setModalContent(<LoginFormModal/>);
    }

    const signup = () => {
        setModalContent(<SignupFormModal/>);
    }

    const logout = (e) => {
        e.preventDefault();

        dispatch(thunkLogout())
            .then(() => closeMenu)
    };

    return (
        <div className="navigation">
            {user ?
                <div className="logged-in">
                    <div className="icons" onClick={() => setHidden(!hidden)}>
                        <FaUserCircle size="48" className="user-icon"/>
                        <FaAngleDown size="48" className="down-icon"/>
                    </div>
                    <div className="links" hidden={hidden} onClick={() => setHidden(true)}>
                        <p className="username">{user.username}</p>
                        <Link to="/friends">Friends</Link>
                        <Link to="/groups">Groups</Link>
                        <Link to="/transactions">Transaction</Link>
                        <button  className="text non-bold" onClick={event => logout(event)}>
                            Log Out
                        </button>
                    </div>
                </div> :
                <div className="logged-out">
                    <button className="secondary" onClick={login}>Log In</button>
                    <button onClick={signup}>Sign Up</button>
                </div>
            }
        </div>
    );
}

export default Navigation;
