import {createBrowserRouter} from 'react-router-dom';
import Layout from './Layout';
import Dashboard from "../components/Dashboard";
import Friendship from "../components/Friendship";
import FriendTransactions from "../components/FriendTransactions/index.js";
import GroupTransactions from "../components/GroupTransactions/index.js";

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
                path: "/details/friend/:id",
                element: <FriendTransactions/>,
            },
            {
                path: "/details/group/:id",
                element: <GroupTransactions/>,
            }
        ],
    },
]);