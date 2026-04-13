import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [requestResponse, setRequestResponse] = useState({
    message: "",
    className: "",
  });

  const initialValues = {
    usernameOrEmail: "", 
    password: "",
  };

  const onSubmit = (values) => {
    axios
      .post("http://localhost:8080/api/auth/login", values) 
      .then((response) => {
        console.log("Login response:", response.data);
        
        localStorage.setItem("user", JSON.stringify(response.data));

        setRequestResponse({
          message: "Login successful!",
          className: "alert alert-success",
        });

        navigate("/dashboard"); 
      })
      .catch(() => {
        setRequestResponse({
          message: "Login failed. Please check your credentials.",
          className: "alert alert-danger",
        });
      });
  };

  const validateSchema = Yup.object({
    usernameOrEmail: Yup.string().required("Username or Email is required"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .required("Password is required"),
  });

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={requestResponse.className}>
          {requestResponse.message}
        </div>

        <h2>Login</h2>
        <hr />

        <Formik
          initialValues={initialValues}
          validationSchema={validateSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form>
              {/* Username / Email */}
              <div className="form-group">
                <label>Username or Email</label>
                <Field
                  type="text"
                  name="usernameOrEmail"
                  className="form-control"
                />
                <ErrorMessage name="usernameOrEmail">
                  {(msg) => <span className="text-danger">{msg}</span>}
                </ErrorMessage>
              </div>

              {/* Password */}
              <div className="form-group mt-2">
                <label>Password</label>
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                />
                <ErrorMessage name="password">
                  {(msg) => <span className="text-danger">{msg}</span>}
                </ErrorMessage>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 mt-3"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>

        <br />
        <p className="text-center">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;