import './Dashboard.css';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {toCurrency} from "../../utils.js";

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

        //Load data
        //Should already be loaded by header
        //dispatch(getBalance())
    }, [navigate, dispatch, user])

    //The HTML that makes up the component
    return (
        <div className="dashboard">
            <header>Balances</header>
            <hr/>
            <div className="balances">
                {Object.entries(balance.users).map(([username, balances]) => (
                    <div key={username} className="balance">
                        <header>{username}</header>
                        <div className="users">
                            {balances
                                .filter(balance => balance.total_debit - balance.total_credit !== 0)
                                .map(balance => {
                                    //Get a group
                                    const group = balance.group_name

                                    //Get outstanding amount
                                    const outstanding = balance.total_debit - balance.total_credit

                                    //The HTML that makes up the component
                                    return (
                                        <div key={group} className="balance">
                                            <div className="name">
                                                <span>Expense from </span>
                                                {
                                                    group !== "-1" ?
                                                        <Link to={`/details/group/${balance.group_id}`}>{group}</Link> :
                                                        <Link to={`/details/friend/${balance.user_id}`}>{username}</Link>
                                                }
                                            </div>
                                            <div className="amount">
                                                You
                                                are {outstanding > 0 ? "owed" : "owe"} {toCurrency(outstanding)}
                                            </div>
                                            <div className="warning" hidden={outstanding > 0}>
                                                You have been overpaid!
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
