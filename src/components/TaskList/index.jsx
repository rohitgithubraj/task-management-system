import React, { useEffect, useState } from 'react';
import Task from './Task';
import axios from 'axios';

const Tasklist = () => {

const user = JSON.parse(localStorage.getItem("user"));
const role = user?.roles?.[0]?.name;
const username = user?.username;

    const [taskList, setTaskList] = useState([]);

    
    const getTaskList = () => {

        let url = "http://localhost:8080/api/tasks";

        if (role === "ROLE_USER") {
            url += `?username=${username}`;
        }


        axios
            .get(url)
            .then((response) => {
                setTaskList(response.data);
            })
            .catch((error) => {
                console.error("Error fetching tasks:", error);
            });
    };

    useEffect(() => {
        getTaskList();
    }, []);

    // 🔥 DELETE TASK (NO RELOAD)
    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;

        axios
            .delete(`http://localhost:8080/api/tasks/${id}`)
            .then(() => {
                // ✅ remove from UI
                setTaskList(taskList.filter((task) => task.id !== id));
            })
            .catch((error) => {
                console.error("Error deleting task:", error);
            });
    };

    return (
        <div className="container">
            <h2 className="text-center mt-4">Task List</h2>

            <table className="table table-striped mt-4">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>User Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {taskList.map((task) => (
                        <Task 
                            key={task.id} 
                            task={task} 
                            onDelete={handleDelete} 
                        />
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default Tasklist;