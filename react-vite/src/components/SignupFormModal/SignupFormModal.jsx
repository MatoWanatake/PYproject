import {useState} from "react";
import {useDispatch} from "react-redux";
import {useModal} from "../../context/Modal";
import {thunkSignup} from "../../redux/session";
import "./SignupForm.css";
import logo from "../../router/split-bill-logo.png";
import LoginFormModal from "../LoginFormModal";

function SignupFormModal() {
    //Access redux
    const dispatch = useDispatch();

    //Access modal handlers
    const {setModalContent, closeModal} = useModal();

    //State
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    //Login
    const login = () => {
        setModalContent(<LoginFormModal/>);
    }

    //Submit
    const handleSubmit = async (event) => {
        //Prevent default actions
        event.preventDefault();

        //Validate
        if (password !== confirmPassword) {
            return setErrors({
                confirmPassword:
                    "Confirm Password field must be the same as the Password field",
            });
        }

        //Persists
        dispatch(
            thunkSignup({
                "first_name": firstName,
                "last_name": lastName,
                email,
                username,
                password,
            })
        ).then(response => {
            if (response) {
                setErrors(response);
            } else {
                closeModal();
            }
        });
    };

    //The HTML that makes up the component
    return (
        <div className="signup-form-modal">
            <header>
                <span>Welcome to</span>
                <img className="logo" src={logo} alt="logo"/>
            </header>
            {errors.server && <p>{errors.server}</p>}
            <form className="form" onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        name="firstName"
                        type="text"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        required
                        placeholder="First Name"
                    />
                    {errors.first_name && <p className="error">{errors.first_name}</p>}
                </div>
                <div className="row">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        name="lastName"
                        type="text"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        required
                        placeholder="Last Name"
                    />
                    {errors.last_name && <p className="error">{errors.last_name}</p>}
                </div>
                <div className="row">
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        placeholder="Email"
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="row">
                    <label htmlFor="username">Username</label>
                    <input
                        name="username"
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                        placeholder="Username"
                    />
                    {errors.username && <p className="error">{errors.username}</p>}
                </div>
                <div className="row">
                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                        placeholder="Password"
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <div className="row">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        required
                        placeholder="Confirm Password"
                    />
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                </div>
                <div className="row full">
                    <button type="submit">Sign Up</button>
                </div>
                <div className="row">
                    <span>Already a member?</span>
                    <button className="text" onClick={login}>Log In</button>
                </div>
            </form>
        </div>
    );
}

export default SignupFormModal;
