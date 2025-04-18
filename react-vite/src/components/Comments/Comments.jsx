import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import './Comments.css';
import {useDispatch, useSelector} from "react-redux";
import {addExpenseComment, getExpenseComments} from "../../redux/expense.js";
import Comment from "./Comment";
import PropTypes from "prop-types";

function Comments({expense_id}) {
    //Access redux
    const dispatch = useDispatch();

    //Get navigation hook
    const navigate = useNavigate();

    //Get data from store
    const user = useSelector((store) => store.session.user);
    const allComments = useSelector((store) => store.expense.comments);

    //State
    const [body, setBody] = useState();
    const [errors, setErrors] = useState({});

    //Submit
    const handleSubmit = async (event) => {
        //Prevent default actions
        event.preventDefault();

        //Persist
        dispatch(addExpenseComment({expense_id, title: "Title", body}))
            .then(() => dispatch(getExpenseComments(expense_id)))
            .catch(response => {
                response.json()
                    .then(json => setErrors(json))
            });
    };

    //Abort if not signed in otherwise load data
    useEffect(() => {
        //Abort if not signed in
        if (!user) {
            navigate('/');
        }

        //Load data
        dispatch(getExpenseComments(expense_id))
    }, [navigate, dispatch, user, expense_id])

    //Access comments for specific expense
    const comments = allComments[expense_id] || [];

    //The HTML that makes up the component
    return (
        <div className="comments">
            {comments.map(comment => (<Comment key={comment.id} user={user} comment={comment}/>))}
            <form className="form" onSubmit={handleSubmit}>
                <header>Create a Comment</header>
                <div className="row full">
                    <label htmlFor="body">&nbsp;</label>
                    <textarea
                        name="body"
                        value={body}
                        onChange={(event) => setBody(event.target.value)}
                        required
                        placeholder="Body"
                    />
                    {errors.body && <p className="error">{errors.body}</p>}
                </div>
                <div className="row full">
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
Comments.propTypes = {
    expense_id: PropTypes.number.isRequired
}

export default Comments;
