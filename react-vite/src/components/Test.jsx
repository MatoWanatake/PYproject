import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Comments from "./Comments/index.js";

function Test() {
    //Access redux
    const dispatch = useDispatch();

    //Get navigation hook
    const navigate = useNavigate();

    //Get data from store
    const user = useSelector((store) => store.session.user);

    //Abort if not signed in otherwise load data
    useEffect(() => {
        //Abort if not signed in
        if (!user) {
            navigate('/');
        }

        //Load data
        //dispatch(getExpenseComments(expense_id))
    }, [navigate, dispatch, user])

    const expense_id = 1

    //The HTML that makes up the component
    return (
        <Comments expense_id={expense_id} />
    )
}

export default Test;