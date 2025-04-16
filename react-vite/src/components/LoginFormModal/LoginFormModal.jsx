import {useState} from "react";
import {thunkLogin} from "../../redux/session";
import {useDispatch} from "react-redux";
import {useModal} from "../../context/Modal";
import "./LoginForm.css";
import logo from "../../router/split-bill-logo.png";
import {useNavigate} from "react-router-dom";

// Should be in sync user_seeder.py
const users = [{
    email: "demo-one@aa.io", password: "password"
}, {
    email: "demo-two@aa.io", password: "password"
}, {
    email: "demo-three@aa.io", password: "password"
}, {
    email: "demo-four@aa.io", password: "password"
}];

function LoginFormModal() {
    //Access redux
    const dispatch = useDispatch();

    //Get navigation hook
    const navigate = useNavigate();

    //Access modal handlers
    const {closeModal} = useModal();

    //State
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errors, setErrors] = useState({});

    //Submit
    const handleSubmit = async (event) => {
        await login(event, email, password);
    };

    const login = async (event, email, password) => {
        //Prevent default actions
        event.preventDefault();

        //Persist
        dispatch(thunkLogin({
            email, password,
        })).then(response => {
            if (response) {
                setErrors(response);
            } else {
                closeModal();
                navigate("/dashboard");
            }
        });
    }

    //The HTML that makes up the component
    return (
        <div className={"login-form-modal"}>
            <img className="logo" src={logo} alt="logo"/>
            <header>Welcome Back!</header>
            <form className="form" onSubmit={handleSubmit}>
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
                <div className="row full">
                    <button type="submit">Log In</button>
                </div>
            </form>
            <header>Quick Login</header>
            <div className="quick-login">
                {users.map((user) => (<button
                    key={user.email}
                    onClick={(event) => {
                        login(event, user.email, user.password)
                    }}>
                    {user.email}
                </button>))}
            </div>
        </div>
    );
}

export default LoginFormModal;
