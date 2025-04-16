import './FriendFormModal.css';
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useModal} from "../../../context/Modal.jsx";
import {isNotNullOrEmpty} from "../../../utils.js";
import {addFriends} from "../../../redux/user.js";

function FriendFormModal() {
    //Access redux
    const dispatch = useDispatch();

    //Access modal handlers
    const {closeModal} = useModal();

    //State
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});

    //Submit
    const handleSubmit = async (e) => {
        //Prevent default actions
        e.preventDefault();

        //Validate
        if (!isNotNullOrEmpty(email)) {
            return setErrors({
                email:
                    "Email field must not be empty.",
            });
        }

        //Persist
        dispatch(addFriends({emails: [email]}))
            .then(() => closeModal())
            .catch(response => {
                response.json()
                    .then(json => setErrors(json))
            });
    };

    //The HTML that makes up the component
    return (
        <div className="friend-form-modal">
            <header>Add a Friend!</header>
            <form className="form" onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        placeholder="Email"
                    />
                    {errors.emails && <p className="error">{errors.emails}</p>}
                </div>
                <div className="row full">
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    );
}

export default FriendFormModal;
