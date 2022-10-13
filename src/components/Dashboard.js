import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import "./Dashboard.css";

function Dashboard() {
  // checking the authentication state. If the user is not authenticated, we redirect the user to the login page.
  const [user, loading] = useAuthState(auth);
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      //retrieving the name of the user based on the uid of the user
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setFirstName(data.firstName);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    fetchUserName();
  }, [user, loading]);
  return (
    <div className="dashboard">
      <div className="dashboard__container">
        Logged in as
        <div>{firstName}</div>
        <div>{user?.email}</div>
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
