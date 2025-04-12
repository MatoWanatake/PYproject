import {Await, useLoaderData} from 'react-router-dom';

import './FriendTransactions.css';
import {Suspense} from "react";
import Transactions from "../Transactions/index.js";

function FriendTransactions() {
    //Get data from the loader
    const data = useLoaderData();

    //The HTML that makes up the component
    return (
        <div className={'friend-transactions'}>
            <div>
                <h1>Transactions</h1>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <Await
                        resolve={data.data}
                    >
                        {
                            data => <Transactions data={data} />
                        }
                    </Await>
                </Suspense>
            </div>
        </div>
    );
}

export default FriendTransactions;
