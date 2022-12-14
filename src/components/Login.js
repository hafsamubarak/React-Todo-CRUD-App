import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle, logInWithEmailAndPassword } from "../Firebase";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { useFormik } from "formik";
import { basicSchema } from "../Schemas";

function Login() {
  //destructuring formik methods to handle errors and submit form
  const { values, handleBlur, handleChange, errors, touched, isSubmitting } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: basicSchema,
    });
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  if (loading) return <div loader></div>;
  if (user) navigate("/todos");
  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className={errors.email && touched.email ? "input-error" : ""}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Email address"
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
          onBlur={handleBlur}
          placeholder="Password"
          name="password"
          required
        />
        {errors.password && touched.password && (
          <p className="error">{errors.password}</p>
        )}
        <button
          className="login__btn"
          type="submit"
          onClick={() =>
            logInWithEmailAndPassword(values.email, values.password)
          }
          disabled={isSubmitting}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div>
          <Link to="/reset">Forget Password?</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register </Link>now!
        </div>
      </div>
    </div>
  );
}

export default Login;
