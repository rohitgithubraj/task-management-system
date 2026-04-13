import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import API from "../../api/api"; 

const Users = () => {

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    //  FETCH USERS
    useEffect(() => {
        API.get("/users")
            .then((res) => {
                console.log("USERS:", res.data);
                setUsers(res.data);
            })
            .catch((err) => {
                console.error("Error fetching users", err);
            });
    }, []);

    // DELETE USER
    const handleDelete = (id) => {
        if (!window.confirm("Are you sure?")) return;

        API.delete(`/users/${id}`)
            .then(() => {
                setUsers(users.filter((user) => user.id !== id));
            })
            .catch((err) => {
                console.error("Delete error", err);
            });
    };

    return (
        <div className="d-flex">

            {/* Sidebar */}
            <Sidebar />

            {/* Content */}
            <div className="flex-grow-1">

                <Navbar />

                <div className="container mt-4">

                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2>Users</h2>

                        <button
                            className="btn btn-primary"
                            onClick={() => navigate("/adduser")}
                        >
                            Add User
                        </button>
                    </div>

                    {/* Table */}
                    <table className="table table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Roles</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>

                                    {/*  Handle roles array */}
                                    <td>
                                        {user.roles?.map((r) => r.name).join(", ")}
                                    </td>

                                    <td>
                                        <button
                                            className={`btn btn-sm btn-danger ${styles.deleteBtn}`}
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>

            </div>
        </div>
    );
};

export default Users;