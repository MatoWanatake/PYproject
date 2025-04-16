import {Suspense, useEffect} from 'react';
import {Await, Outlet, useLoaderData, useNavigate} from 'react-router-dom';

import './Example.css';
import Friends from "../Friends";
import Groups from "../Groups";
import {useSelector} from "react-redux";
import Credit from "../Credit";
import Expense from "../Expense";

function Example() {
    //Get navigation hook
    const navigate = useNavigate();

    //Get data from the loader
    const data = useLoaderData();

    //Get user from store
    const user = useSelector((store) => store.session.user);

    //Abort if not signed in
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [navigate, user])

    //The HTML that makes up the component
    return (
        <div className="example">
            <div>
                <h1>Groups</h1>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <Await
                        resolve={data.groups}
                    >
                        {
                            groups => <Groups groups={groups} />
                        }
                    </Await>
                </Suspense>
            </div>

            <div>
                <h1>Friends</h1>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <Await
                        resolve={data.friends}
                    >
                        {
                            friends => <Friends friends={friends} />
                        }
                    </Await>
                </Suspense>
            </div>

            <Expense />

            <Credit />

            <Outlet/>
        </div>
    );
}

export default Example;
