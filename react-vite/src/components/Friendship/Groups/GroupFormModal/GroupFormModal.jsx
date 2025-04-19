import './GroupFormModal.css';
import {useDispatch, useSelector} from "react-redux";
import {useModal} from "../../../../context/Modal.jsx";
import {useEffect, useState} from "react";
import {createGroup, getFriends} from "../../../../redux/user.js";
import {useNavigate} from "react-router-dom";

function GroupFormModal() {
    //Access redux
    const dispatch = useDispatch();

    //Get navigation hook
    const navigate = useNavigate();

    //Get data from the store
    const user = useSelector((store) => store.session.user);
    const friends = useSelector((store) => store.user.friends);

    //Access modal handlers
    const {closeModal} = useModal();

    //State
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [errors, setErrors] = useState({});

    //Update friends
    const updateFriends = (event) => {
        setSelectedFriends(
           Array.from(event.target.options)
                .filter(option => option.selected)
                .map(option => option.value)
        );
    }

    //Submit
    const handleSubmit = async (event) => {
        //Prevent default actions
        event.preventDefault();

        //Persist
        dispatch(createGroup({name, description, ids: selectedFriends}))
            .then(() => closeModal())
            .catch(response => {
                response.json()
                    .then(json => setErrors(json))
            });
    };

    //Abort if is not signed in otherwise load data
    useEffect(() => {
        //Abort if is not signed in
        if (!user) {
            navigate('/');
        }

        //Load data
        dispatch(getFriends())
    }, [navigate, dispatch, user])

    //The HTML that makes up the component
    return (
        <div className="group-form-modal">
            <header>Create a Group!</header>
            <form className="form" onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="name">Name</label>
                    <input
                        name="name"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                        placeholder="Name"
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div className="row">
                    <label htmlFor="description">Description</label>
                    <input
                        name="description"
                        type="text"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Description"
                    />
                    {errors.description && <p className="error">{errors.description}</p>}
                </div>
                <div className="row">
                    <label htmlFor="friends">Friends</label>
                    <select
                        name="friends"
                        value={selectedFriends}
                        onChange={updateFriends}
                        required
                        multiple
                    >
                        {friends.map(friend => (
                            <option key={friend.id} value={friend.id}>{friend.username}</option>
                        ))}
                    </select>
                    {errors.friends && <p className="error">{errors.friends}</p>}
                </div>
                <div className="row full">
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    );
}

export default GroupFormModal;
