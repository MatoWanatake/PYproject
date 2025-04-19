import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import './CommentFormModal.css';
import {useDispatch, useSelector} from "react-redux";
import {useModal} from "../../../context/Modal.jsx";
import {addExpenseComment, editExpenseComment, getExpenseComments} from "../../../redux/expense.js";
import PropTypes from "prop-types";

function CommentFormModal({expense_id, comment}) {
    //Access redux
    const dispatch = useDispatch();

    //Get navigation hook
    const navigate = useNavigate();

    //Get data from the store
    const user = useSelector((store) => store.session.user);

    //Access modal handlers
    const {closeModal} = useModal();

    //State
    const [body, setBody] = useState(comment ? comment.body : "");
    const [errors, setErrors] = useState({});

    //Submit
    const handleSubmit = async (event) => {
        //Prevent default actions
        event.preventDefault();

        //Persist
        const promise =
            comment?.id ?
                //Update
                dispatch(editExpenseComment({
                    expense_id,
                    comment_id: comment.id,
                    title: comment.title,
                    body
                })) :

                //New
                dispatch(addExpenseComment({
                    expense_id,
                    title: "Title",
                    body
                }));

        promise
            .then(() => dispatch(getExpenseComments(expense_id)))
            .then(() => closeModal())
            .catch(response => {
                response.json()
                    .then(json => setErrors(json))
            });
    };

    //Cancel
    const cancel = (event) => {
        //Prevent default actions
        event.preventDefault();

        //Close modal
        closeModal();
    }

    //Abort if is not signed in otherwise load data
    useEffect(() => {
        //Abort if is not signed in
        if (!user) {
            navigate('/');
        }

        //Load data
    }, [navigate, dispatch, user])

    //The HTML that makes up the component
    return (
        <div className="comment-form-modal">
            <header>Create a Comment</header>
            <form className="form" onSubmit={handleSubmit}>
                <div className="row full">
                    <textarea
                        name="body"
                        value={body}
                        onChange={(event) => setBody(event.target.value)}
                        required
                        placeholder="Body"
                    />
                    {errors.body && <p className="error">{errors.body}</p>}
                </div>
                <div className="row full buttons">
                    <button className="tertiary" onClick={cancel}>Cancel</button>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
CommentFormModal.propTypes = {
    expense_id: PropTypes.number.isRequired,
    comment: PropTypes.shape({
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        expense_id: PropTypes.number.isRequired,
        user_id: PropTypes.number.isRequired,
        user: PropTypes.object.isRequired,
    }),
}

export default CommentFormModal;
