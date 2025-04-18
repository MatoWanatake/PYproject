import './Groups.css';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteGroup } from "../../redux/groups";

function Groups({ groups }) {
    const dispatch = useDispatch();

    const handleDelete = async (groupId) => {
        await dispatch(deleteGroup(groupId));
    };

    return (
        <div className={'groups'}>
            <ul>
                {groups.map(group => (
                    <li key={group.id}>
                        <Link to={`/example/group/${group.id}`}>
                            {group.name}
                        </Link>
                        <button onClick={() => handleDelete(group.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

Groups.propTypes = {
    groups: PropTypes.array.isRequired,
};

export default Groups;
