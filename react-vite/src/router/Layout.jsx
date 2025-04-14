import {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Modal, ModalProvider} from "../context/Modal";
import {thunkAuthenticate} from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import logo from "./split-bill-logo.png";

export default function Layout() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <ModalProvider>
            <div className="container">
                <div className="column logo">
                    <img className="logo" src={logo} alt="Split Bill" />
                </div>
                <div className="column content">
                    {isLoaded && <Outlet/>}
                </div>
                <div className="column navigation">
                    <Navigation/>
                </div>
            </div>
            <Modal/>
        </ModalProvider>
    );
}
