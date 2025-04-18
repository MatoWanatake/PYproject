import {createBrowserRouter} from 'react-router-dom';
import Layout from './Layout';
import Dashboard from "../components/Dashboard";
import Friendship from "../components/Friendship";
import Transactions from "../components/Transactions";
import Test from "../components/Test.jsx";
import FriendTransactions from "../components/Transactions/FriendTransactions/index.js";
import GroupTransactions from "../components/Transactions/GroupTransactions/index.js";

export const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Dashboard/>,
            },
            {
                path: "/friendship",
                element: <Friendship/>,
            },
            {
                path: "/transactions",
                element: <Transactions/>,
            },
            {
                path: "/details/friend/:id",
                element: <FriendTransactions/>,
            },
            {
                path: "/details/group/:id",
                element: <GroupTransactions/>,
            },
            {
                path: "/test",
                element: <Test/>
            }
        ],
    },
]);