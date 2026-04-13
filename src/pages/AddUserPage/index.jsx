import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import API from "../../api/api"; 

const AddUser = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",   
        role: "USER"
    });

    const [message, setMessage] = useState("");

    // handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault();

        //  map role properly
        const payload = {
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role === "ADMIN" ? "ROLE_ADMIN" : "ROLE_USER"
        };

        API.post("/auth/register", payload) 
            .then(() => {
                setMessage("User added successfully!");
                navigate("/users");

                setTimeout(() => {
                    navigate("/users");
                }, 1000);
            })
            .catch((err) => {
                console.error(err);
                setMessage("Error adding user");
            });
    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">
                <div className={styles.wrapper}>

                    <div className="card p-4">
                        <h2 className="text-center mb-4">Add User</h2>

                        {/* Message */}
                        {message && (
                            <div className="alert alert-info text-center">
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            {/* Username */}
                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    value={user.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={user.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={user.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Role */}
                            <div className="mb-3">
                                <label className="form-label">Role</label>
                                <select
                                    name="role"
                                    className="form-control"
                                    value={user.role}
                                    onChange={handleChange}
                                >
                                    <option value="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="text-center d-flex justify-content-center">
                                <button type="submit" className={`btn btn-primary mr-2`}>
                                    Add User
                                </button>

                                <button
                                    type="button"
                                    className={`btn btn-secondary `}
                                    onClick={() => navigate("/users")}
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

export default AddUser;