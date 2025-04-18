import './Groups.css';
import PropTypes from "prop-types";
import {useModal} from "../../../context/Modal.jsx";
import GroupFormModal from "./GroupFormModal/index.js";
import Group from "./Group/index.js";
import {Link} from "react-router-dom";

function Groups({groups}) {
    //Access modal handlers
    const {setModalContent} = useModal();

    //Add Group
    const group = event => {
        //Prevent default actions
        event.preventDefault();

        //Show modal
        setModalContent(<GroupFormModal/>)
    }

    //The HTML that makes up the component
    return (
        <div className="groups">
            {groups.map(group => (
                <Link key={group.id} to={`/details/group/${group.id}`}>
                    <Group key={group.id} name={group.name}/>
                </Link>
            ))}
            <Group name="Create a Group" click={group}/>
        </div>
    );
}

// https://www.npmjs.com/package/prop-types
Groups.propTypes = {
    groups: PropTypes.array.isRequired,
}

export default Groups;
