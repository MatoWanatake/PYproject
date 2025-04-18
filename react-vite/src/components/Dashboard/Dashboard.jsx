import './Dashboard.css';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {CURRENCY_FORMATER} from "../../utils.js";

function Dashboard() {
    //Access redux
    const dispatch = useDispatch();

    //Get navigation hook
    const navigate = useNavigate();

    //Get data from store
    const user = useSelector((store) => store.session.user);
    const balance = useSelector((store) => store.user.balance);

    //Abort if not signed in otherwise load data
    useEffect(() => {
        //Abort if not signed in
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
                                    //Get group
                                    const group = balance.group_name

                                    //Get outstanding amount
                                    const outstanding = balance.total_debit - balance.total_credit

                                    //The HTML that makes up the component
                                    return (
                                        <div key={group} className="user">
                                            <div className="name">
                                                Expense from {group !== "-" ? `group ${group}` : "direct friendship"}
                                            </div>
                                            <div className="amount">
                                                You
                                                are {outstanding > 0 ? "owed" : "owe"} {CURRENCY_FORMATER.format(outstanding)}
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
