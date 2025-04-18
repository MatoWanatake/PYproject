import {createBrowserRouter} from 'react-router-dom';
import Layout from './Layout';
import Dashboard from "../components/Dashboard";
import Friendship from "../components/Friendship";
import Transactions from "../components/Transactions";
import Test from "../components/Test.jsx";

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
                path: "/test",
                element: <Test/>
            }
        ],
    },
]);