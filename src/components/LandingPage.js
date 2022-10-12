import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import "./LandingPage.css";
function LandingPage() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  if (user) navigate("/todos");
  return (
    <>
      <div className="main">Welcome to my first Project with React JS</div>
      <div className="second">
        This is a simple Task Manager or Todo-list App
      </div>
      <p className="para">
        The user can Register,Login, Add a task, Edit it, delete it and view it!
      </p>
    </>
  );
}

export default LandingPage;
