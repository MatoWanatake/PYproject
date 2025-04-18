import './Comment.css';
import PropTypes from "prop-types";
import {toLocalDate} from "../../../utils.js";
import {useDispatch} from "react-redux";
import {deleteExpenseComment} from "../../../redux/expense.js";
import {useModal} from "../../../context/Modal.jsx";
import CommentFormModal from "../CommentFormModal/index.js";

function Comment({user, comment}) {
    //Access redux
    const dispatch = useDispatch();

    //Access modal handlers
    const {setModalContent} = useModal();

    //Remove
    const remove = (event) => {
        //Prevent default actions
        event.preventDefault();

        //Persist
        dispatch(deleteExpenseComment({
            expense_id: comment.expense_id,
            comment_id: comment.id
        }))
    }

    //Edit
    const edit = (event) => {
        //Prevent default actions
        event.preventDefault();

        //Show modal
        setModalContent(<CommentFormModal expense_id={comment.expense_id} comment={comment}/>)
    }

    //The HTML that makes up the component
    return (
        <div className="comment">
            <div className="body">{comment.body}</div>
            <div className="details">posted by {comment.user.email} @ {toLocalDate(comment.created_at)}</div>
            <div className={user.id === comment.user_id ? "actions" : "actions hidden"}>
                <button className="important" onClick={remove}>Delete</button>
                <button className="tertiary" onClick={edit}>Edit</button>
            </div>
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
Comment.propTypes = {
    user: PropTypes.object.isRequired,
    comment: PropTypes.shape({
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        expense_id: PropTypes.number.isRequired,
        user_id: PropTypes.number.isRequired,
        user: PropTypes.object.isRequired,
    }).isRequired,
}

export default Comment;
