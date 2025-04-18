import {createBrowserRouter} from 'react-router-dom';
import Layout from './Layout';
import Dashboard from "../components/Dashboard";
import Friendship from "../components/Friendship";
import Transactions from "../components/Transactions";

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
                //fetch(`/api/expense-group/${params.id}`)
                //fetch(`/api/expense-friend/${params.id}`)
                path: "/transactions",
                element: <Transactions/>,
            }
        ],
    },
]);