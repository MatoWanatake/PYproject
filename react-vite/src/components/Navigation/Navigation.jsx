import "./Navigation.css";
import {useModal} from "../../context/Modal.jsx";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import {useDispatch, useSelector} from "react-redux";
import {FaAngleDown, FaAngleRight, FaUserCircle} from "react-icons/fa";
import {NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import {thunkLogout} from "../../redux/session.js";

function Navigation() {
    const navigate = useNavigate();
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
            .then(() => navigate("/"));
    };

    return (
        <div className="navigation">
            {user ?
                <div
                    className="logged-in"
                    onClick={() => setHidden(!hidden)}
                    onMouseLeave={() => setHidden(true)}
                >
                    <div className="icons">
                        <FaUserCircle size="48" className="user-icon"/>
                        {hidden ?
                            <FaAngleRight size="48" className="down-icon"/> :
                            <FaAngleDown size="48" className="down-icon"/>
                        }
                    </div>
                    <div className="links" hidden={hidden} onClick={() => setHidden(true)}>
                        <p className="username">{user.username}</p>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                        <NavLink to="/friendship">Friendship</NavLink>
                        <NavLink to="/transactions">Transaction</NavLink>
                        <button className="text non-bold" onClick={event => logout(event)}>
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
