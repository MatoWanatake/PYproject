import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Modal, ModalProvider} from "../context/Modal";
import {thunkAuthenticate} from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import logo from "./split-bill-logo.png";
import Content from "../components/Content";
import './Layout.css';

export default function Layout() {
    const dispatch = useDispatch();

    //Get data from the store
    const user = useSelector((store) => store.session.user);

    useEffect(() => {
        dispatch(thunkAuthenticate())
    }, [dispatch]);

    return (
        <ModalProvider>
            <div className="layout">
                <div className="container">
                    <div className="column logo">
                        <img className="logo" src={logo} alt="Split Bill"/>
                    </div>
                    <div className="column content">
                        <Content user={user}/>
                    </div>
                    <div className="column navigation">
                        <Navigation/>
                    </div>
                </div>
            </div>
            <Modal/>
        </ModalProvider>
    );
}
