import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import './Comments.css';
import {useDispatch, useSelector} from "react-redux";
import {getExpenseComments} from "../../redux/expense.js";
import Comment from "./Comment";
import PropTypes from "prop-types";
import {useModal} from "../../context/Modal.jsx";
import CommentFormModal from "./CommentFormModal";

function Comments({expense_id}) {
    //Access redux
    const dispatch = useDispatch();

    //Get navigation hook
    const navigate = useNavigate();

    //Access modal handlers
    const {setModalContent} = useModal();

    //Get data from the store
    const user = useSelector((store) => store.session.user);
    const allComments = useSelector((store) => store.expense.comments);

    //Add
    const add = (event) => {
        //Prevent default actions
        event.preventDefault();

        //Show modal
        setModalContent(<CommentFormModal expense_id={expense_id}/>)
    }

    //Abort if is not signed in otherwise load data
    useEffect(() => {
        //Abort if is not signed in
        if (!user) {
            navigate('/');
        }

        //Load data
        dispatch(getExpenseComments(expense_id))
    }, [navigate, dispatch, user, expense_id])

    //Access comments for the specific expense
    const comments = allComments[expense_id] || [];

    //The HTML that makes up the component
    return (
        <div className="comments">
            <div className="list">
                {comments.map(comment => (<Comment key={comment.id} user={user} comment={comment}/>))}
            </div>
            <div className="action">
                <button onClick={add}>Add a Comment</button>
            </div>
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
Comments.propTypes = {
    expense_id: PropTypes.number.isRequired
}

export default Comments;
