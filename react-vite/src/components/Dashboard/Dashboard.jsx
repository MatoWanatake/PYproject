import './Dashboard.css';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function Dashboard() {
    //Get navigation hook
    const navigate = useNavigate();

    //Get user from store
    const user = useSelector((store) => store.session.user);

    //State
    const [active, setActive] = useState("owe");

    //Abort if not signed in
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [navigate, user])

    //The HTML that makes up the component
    return (
        <div className={'dashboard'}>
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
                        OWE
                    </div>
                )}
                {active === "owed" && (
                    <div className="owed">
                        OWED
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
