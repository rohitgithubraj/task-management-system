import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
import styles from "./style.module.css";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [responseMsg, setResponseMsg] = useState({
    message: "",
    className: "",
  });

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    password: Yup.string()
      .min(4, "Minimum 4 characters")
      .required("Password is required"),
  });

  const onSubmit = (values) => {
    axios
      .post("http://localhost:8080/api/auth/register", values)
      .then((res) => {
        setResponseMsg({
          message: "Registration successful!",
          className: "alert alert-success",
        });

        
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((err) => {
        setResponseMsg({
          message: err.response?.data || "Registration failed",
          className: "alert alert-danger",
        });
      });
  };

  return (
    <div className="container">
      <div className={styles.wrapper}>

        {/* Response Message */}
        {responseMsg.message && (
          <div className={responseMsg.className}>
            {responseMsg.message}
          </div>
        )}

        <h2>Register</h2>
        <hr />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form>

              {/* Username */}
              <div className="form-group">
                <label>Username</label>
                <Field
                  type="text"
                  name="username"
                  className="form-control"
                />
                <ErrorMessage name="username">
                  {(msg) => <span className="text-danger">{msg}</span>}
                </ErrorMessage>
              </div>

              {/* Email */}
              <div className="form-group mt-2">
                <label>Email</label>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                />
                <ErrorMessage name="email">
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

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-100 mt-3"
                disabled={!formik.isValid}
              >
                Register
              </button>

            </Form>
          )}
        </Formik>

        <br />
        <p className="text-center">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
};

export default RegisterPage;