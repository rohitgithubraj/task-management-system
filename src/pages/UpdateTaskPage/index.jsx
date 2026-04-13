import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "./style.module.css";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/api";

const UpdateTaskPage = () => {

    const { id } = useParams(); // ✅ FIX
    const navigate = useNavigate();

    const [task, setTask] = useState({
        username: "",
        description: "",
        status: "Pending"
    });

    const [message, setMessage] = useState("");

    // 🔥 FETCH TASK BY ID
    useEffect(() => {
        API.get(`/tasks/${id}`)
            .then((response) => {
                setTask(response.data);
            })
            .catch((error) => {
                console.error("Error fetching task:", error);
            });
    }, [id]);

    // handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    // UPDATE TASK
    const handleSubmit = (e) => {
        e.preventDefault();

        API.put(`/tasks/${id}`, task)
            .then(() => {
                setMessage("Task updated successfully!");

                setTimeout(() => {
                    navigate("/dashboard");
                }, 1000);
            })
            .catch((error) => {
                console.error("Update error:", error);
                setMessage("Failed to update task");
            });
    };

    const handleCancel = () => {
        navigate("/dashboard");
    };

    return (
        <>
            <Navbar />

            <div className="container">
                <div className={styles.wrapper}>

                    <h2 className="text-center mt-5">Update Task</h2>

                    {/* Message */}
                    {message && (
                        <div className="alert alert-info text-center">
                            {message}
                        </div>
                    )}

                    <form className="mt-4" onSubmit={handleSubmit}>

                        {/* ID */}
                        <div className="form-group mb-3 text-start">
                            <label>Task Id</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={id}
                                disabled
                            />
                        </div>

                        {/* Username */}
                        <div className="form-group mb-3 text-start">
                            <label>User Name</label>
                            <input 
                                type="text" 
                                name="username"
                                className="form-control"
                                value={task.username}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Description */}
                        <div className="form-group mb-3 text-start">
                            <label>Task Description</label>
                            <input 
                                type="text" 
                                name="description"
                                className="form-control"
                                value={task.description}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Status */}
                        <div className="form-group mb-3 text-start">
                            <label>Status</label>
                            <select 
                                name="status"
                                className="form-control"
                                value={task.status}
                                onChange={handleChange}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>

                        {/* Buttons */}
                        <div className="d-flex justify-content-center">
                            <button 
                                type="submit"
                                className={`btn btn-primary me-2 ${styles.updateBtn}`}
                            >
                                Update
                            </button>

                            <button 
                                type="button"
                                className={`btn btn-secondary ${styles.cancelBtn}`} 
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateTaskPage;