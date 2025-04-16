import {createBrowserRouter, defer} from 'react-router-dom';
import Layout from './Layout';
import Example from "../components/Example/index.js";
import FriendTransactions from "../components/FriendTransactions/index.js";
import GroupTransactions from "../components/GroupTransactions/index.js";

export const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <></>
            },
            {
                path: "/dashboard",
                element: <>Dashboard</>
            },
            {
                path: "/friends",
                element: <>Friends</>
            },
            {
                path: "/groups",
                element: <>Groups</>
            },
            {
                path: "/transactions",
                element: <>Transactions</>
            },
            {
                path: "/example",
                element: <Example/>,
                //https://reactrouter.com/6.30.0/route/loader
                loader: async () => {
                    return defer({
                        groups: fetch('/api/groups').then(res => res.json()),
                        friends: fetch('/api/friends').then(res => res.json()),
                    })
                },
                children: [
                    {
                        path: "group/:id",
                        element: <GroupTransactions/>,
                        //https://reactrouter.com/6.30.0/route/loader
                        loader: async ({params}) => {
                            return defer({
                                data: fetch(`/api/expense-group/${params.id}`).then(res => res.json()),
                            })
                        }
                    },
                    {
                        path: "friend/:id",
                        element: <FriendTransactions/>,
                        //https://reactrouter.com/6.30.0/route/loader
                        loader: async ({params}) => {
                            return defer({
                                data: fetch(`/api/expense-friend/${params.id}`).then(res => res.json()),
                            })
                        }
                    }
                ]
            }
        ],
    },
]);