import './Dashboard.css';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Balances from "./Balances/index.js";

function Dashboard() {
    //Access redux
    const dispatch = useDispatch();

    //Get navigation hook
    const navigate = useNavigate();

    //Get data from the store
    const user = useSelector((store) => store.session.user);
    const balance = useSelector((store) => store.user.balance);

    //Abort if is not signed in otherwise load data
    useEffect(() => {
        //Abort if is not signed in
        if (!user) {
            navigate('/');
        }
    }, [navigate, dispatch, user])

    //The HTML that makes up the component
    return (
        <div className="dashboard">
            <Balances balances={balance.transactions}/>
        </div>
    );
}

export default Dashboard;
