import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../Firebase";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";
import { useFormik } from "formik";
import { basicSchema } from "../Schemas";

function Register() {
  //destructuring formik methods to handle errors and submit form
  const { values, handleBlur, handleChange, errors, touched } = useFormik({
    initialValues: {
      firstName: "",
      secondName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: basicSchema,
  });

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const signUp = (e) => {
    e.preventDefault();
    // if (!values.firstName) alert("Please enter name!");
    registerWithEmailAndPassword(
      values.firstName,
      values.email,
      values.password
    );
  };

  //keep track of user authentication status
  if (loading) return <div className="loader"></div>;
  if (user) navigate("/dashboard");
  return (
    <div className="register">
      <div className="register__container">
        <form onSubmit={signUp}>
          <input
            type="text"
            className={
              errors.firstName && touched.firstName ? "input-error" : ""
            }
            value={values.firstName}
            onChange={handleChange}
            placeholder="First Name"
            onBlur={handleBlur}
            name="firstName"
            required
          />
          {errors.firstName && touched.firstName && (
            <p className="error">{errors.firstName}</p>
          )}

          <input
            type="text"
            className="register__textBox"
            value={values.secondName}
            onChange={handleChange}
            placeholder="Second Name"
            onBlur={handleBlur}
            name="secondName"
          />

          <input
            type="email"
            className={errors.email && touched.email ? "input-error" : ""}
            value={values.email}
            onChange={handleChange}
            placeholder="Email address"
            onBlur={handleBlur}
            name="email"
            required
          />
          {errors.email && touched.email && (
            <p className="error">{errors.email}</p>
          )}

          <input
            type="password"
            className={errors.password && touched.password ? "input-error" : ""}
            value={values.password}
            onChange={handleChange}
            placeholder="Password"
            onBlur={handleBlur}
            name="password"
            required
          />
          {errors.password && touched.password && (
            <p className="error">{errors.password}</p>
          )}
          <input
            type="password"
            className={
              errors.confirmPassword && touched.confirmPassword
                ? "input-error"
                : ""
            }
            value={values.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            onBlur={handleBlur}
            name="confirmPassword"
            required
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
          <button
            // className="register__btn"
            type="submit"
            // onSubmit={signUp}
            disabled={!(values.password === values.confirmPassword)}
          >
            Register
          </button>
          <button
            className="register__btn register__google"
            onClick={signInWithGoogle}
          >
            Register with Google
          </button>
          <div>
            Already have an account? <Link to="/login">login </Link>now
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
