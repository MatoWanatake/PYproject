import {useEffect} from "react";
import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Modal, ModalProvider} from "../context/Modal";
import {thunkAuthenticate} from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import logo from "./split-bill-logo.png";
import background from "./home-page.png"

export default function Layout() {
    const dispatch = useDispatch();

    const user = useSelector((store) => store.session.user);

    useEffect(() => {
        dispatch(thunkAuthenticate())
    }, [dispatch]);

    return (
        <ModalProvider>
            <div className="container">
                <div className="column logo">
                    <img className="logo" src={logo} alt="Split Bill" />
                </div>
                <div className="column content">
                    {user ? <Outlet/> : <img className="background" src={background} alt="Split Bill" />}
                </div>
                <div className="column navigation">
                    <Navigation/>
                </div>
            </div>
            <Modal/>
        </ModalProvider>
    );
}
