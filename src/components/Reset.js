import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, sendPasswordReset } from "../Firebase";
import { useNavigate, Link } from "react-router-dom";
import "./Reset.css";

function Reset() {
  //reset pasword
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  if (loading) return <div className="loader"></div>;
  if (user) navigate("/dashboard");

  return (
    <div className="reset">
      <div className="reset__container">
        <input
          type="email"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          required
        />
        <button className="reset__btn" onClick={() => sendPasswordReset(email)}>
          send password reset to email
        </button>
        <div>
          Don't have an account? <Link to="/register">Register </Link>now
        </div>
      </div>
    </div>
  );
}

export default Reset;
