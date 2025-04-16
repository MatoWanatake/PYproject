import {Outlet} from 'react-router-dom';

import './LoggedIn.css';
import Header from "./Header/index.js";

function LoggedIn() {
    //The HTML that makes up the component
    return (
        <div className={'logged-in'}>
            <Header/>
            <Outlet/>
        </div>
    );
}

export default LoggedIn;
