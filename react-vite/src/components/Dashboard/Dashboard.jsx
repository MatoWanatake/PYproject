import './Dashboard.css';
import {Suspense, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Await, useLoaderData, useNavigate} from "react-router-dom";
import {FaCat} from "react-icons/fa6";
import {CURRENCY_FORMATER} from "../../utils.js";

function Dashboard() {
    //Get navigation hook
    const navigate = useNavigate();

    //Get data from the loader
    const data = useLoaderData();

    //Get user from store
    const user = useSelector((store) => store.session.user);

    //State
    const [active, setActive] = useState("owe");

    //data.balances.then(data => console.log(data))
    //data.debits.then(data => console.log(data))
    //data.credits.then(data => console.log(data))

    //Abort if not signed in
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [navigate, user])

    //The HTML that makes up the component
    return (
        <div className="dashboard">
            <header>
                <button
                    className={`text ${active === "owe" ? "active" : ""}`}
                    onClick={() => setActive("owe")}
                >
                    You Owe
                </button>
                <button
                    className={`text ${active === "owed" ? "active" : ""}`}
                    onClick={() => setActive("owed")}
                >
                    You Are Owed
                </button>
            </header>
            <hr />
            <div className="container">
                {active === "owe" && (
                    <div className="owe">
                        <Suspense fallback={<h1>Loading...</h1>}>
                            <Await resolve={data.debits}>
                                {debits => debits.map(debit => (
                                    <div key={debit.expense.id + "-" + debit.expense.user_id} className="item">
                                        <header>
                                            <FaCat className="icon" size="48"/>
                                            <div className="who">
                                                <div className="name">{debit.user.username}</div>
                                                <div className="amount">is owed {CURRENCY_FORMATER.format(debit.debit.amount)}</div>
                                            </div>
                                        </header>
                                        <div className="description">
                                            <div className="title">{debit.expense.title}</div>
                                            <div className="group" hidden={!debit.group}>
                                                <div className="name">{debit.group?.name}</div>
                                                <div className="description">{debit.group?.description}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Await>
                        </Suspense>
                    </div>
                )}
                {active === "owed" && (
                    <div className="owed">
                        <Suspense fallback={<h1>Loading...</h1>}>
                            <Await resolve={data.credits}>
                                {debits => debits.map(debit => (
                                    <div key={debit.expense.id + "-" + debit.expense.user_id} className="item">
                                        <header>
                                            <FaCat className="icon" size="48"/>
                                            <div className="who">
                                                <div className="name">{debit.user.username}</div>
                                                <div className="amount">owes you {CURRENCY_FORMATER.format(debit.debit.amount)}</div>
                                            </div>
                                        </header>
                                        <div className="description">
                                            <div className="title">{debit.expense.title}</div>
                                            <div className="group" hidden={!debit.group}>
                                                <div className="name">{debit.group?.name}</div>
                                                <div className="description">{debit.group?.description}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Await>
                        </Suspense>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
