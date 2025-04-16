import './LoggedOut.css';
import background from "../../../router/home-page.png";


function LoggedOut() {
    //The HTML that makes up the component
    return (
        <div className="logged-out">
            <img className="background" src={background} alt="Split Bill"/>
        </div>
    );
}

export default LoggedOut;
