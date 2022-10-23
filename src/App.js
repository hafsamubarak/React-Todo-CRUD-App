import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Todos from "./components/TaskManager";
import Header from "./components/Header";
import "./App.css";
import LandingPage from "./components/LandingPage";
import AddTask from "./AddTask";
import EditTask from "./EditTask";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />

          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/todos" element={<Todos />} />
          <Route exact path="/addTask" element={<AddTask />} />
          <Route exact path="/edit/:id" element={<EditTask />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
