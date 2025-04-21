import './Comment.css';
import {toLocalDate} from "../../../utils.js";
import {useDispatch} from "react-redux";
import {deleteExpenseComment, PROP_TYPE_COMMENT} from "../../../redux/expense.js";
import {useModal} from "../../../context/Modal.jsx";
import CommentFormModal from "../CommentFormModal";
import {PROP_TYPE_USER} from "../../../redux/session.js";

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
    user: PROP_TYPE_USER.isRequired,
    comment: PROP_TYPE_COMMENT.isRequired,
}

export default Comment;
