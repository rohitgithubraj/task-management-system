import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import API from "../../api/api"; 

const CreateTask = () => {

    const navigate = useNavigate();

    const [task, setTask] = useState({
        username: "",
        description: "",
        status: "Pending"
    });

    const [message, setMessage] = useState("");

    // handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    //  HANDLE SUBMIT (API CALL)
    const handleSubmit = (e) => {
        e.preventDefault();

        API.post("/tasks", task)
            .then(() => {
                setMessage("Task created successfully!");

                // redirect after 1 sec
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1000);
            })
            .catch((error) => {
                console.error("Error creating task:", error);
                setMessage("Failed to create task! User Not Found");
            });
    };

    const handleCancel = () => {
        navigate("/dashboard");
    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">
                <div className={styles.wrapper}>

                    <div className="card p-4">
                        <h2 className="text-center mb-4">Create Task</h2>

                        {/*  Message */}
                        {message && (
                            <div className="alert alert-info text-center">
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            {/* Username */}
                            <div className="mb-3">
                                <label className="form-label">User Name</label>
                                <input
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    placeholder="Enter user name"
                                    value={task.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="mb-3">
                                <label className="form-label">Task Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    className="form-control"
                                    placeholder="Enter task description"
                                    value={task.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Status */}
                            <div className="mb-3">
                                <label className="form-label">Status</label>
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
                            <div className="text-center">
                                <button 
                                    type="submit" 
                                    className={`btn btn-primary me-2 ${styles.CreateBtn}`}
                                >
                                    Create
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
            </div>
        </>
    );
};

export default CreateTask;