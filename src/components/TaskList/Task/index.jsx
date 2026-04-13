import { useNavigate } from "react-router-dom";
import styles from './style.module.css';

const Task = ({ task, onDelete }) => {

    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/updatetask/${task.id}`);
    };

    const handleDelete = () => {
        if (!window.confirm("Delete this task?")) return;

        onDelete(task.id); 
    };

    const { id, username, description, status } = task;

    return (
        <tr>
            <td>{id}</td>
            <td>{username}</td>
            <td>{description}</td>
            <td>{status}</td>
            <td>
                <button 
                    className={`btn btn-primary me-2 ${styles.updateBtn}`} 
                    onClick={handleEdit}
                >
                    Edit
                </button>

                <button 
                    className={`btn btn-danger ${styles.deleteBtn}`} 
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default Task;