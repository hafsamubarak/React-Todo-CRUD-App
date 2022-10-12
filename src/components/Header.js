import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth, logout } from "../Firebase";
import "./Header.css";

function Header() {
  const [user] = useAuthState(auth);
  return (
    <div className="taskManager">
      <header>
        <Link to="/">Task Manager</Link>
        {user ? (
          <Link onClick={logout}>Logout</Link>
        ) : (
          <Link to="/login">Login </Link>
        )}
        {user ? (
          <Link to="/dashboard">Account</Link>
        ) : (
          <Link to="/register">Register</Link>
        )}
      </header>
    </div>
  );
}

export default Header;
