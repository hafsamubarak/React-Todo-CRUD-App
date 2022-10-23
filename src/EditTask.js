import { useEffect, useState } from "react";
import "./editTask.css";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "./Firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

function EditTask() {
  // console.log(toEditTitle);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  // const [checked] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [user] = useAuthState(auth);
  const [currentTask, setCurrentTask] = useState({});

  // console.log(priority);
  const navigate = useNavigate();
  //get all tasks
  useEffect(() => {
    if (!user) navigate("/login");
    const taskColRef = query(
      collection(db, "tasks"),
      orderBy("created", "desc")
    );
    onSnapshot(taskColRef, (snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, [user]);
  //get current task id with id in url
  const currentTaskId = window.location.pathname.split("/")[2];
  //show only one task by filtering tasks by id
  useEffect(() => {
    if (tasks) {
      const filterTasks = tasks.filter((task) => task.id === currentTaskId);
      console.log("heyyyy", filterTasks);
      setCurrentTask(filterTasks[0]?.data);
      setPriority(filterTasks[0]?.data?.priority);
    }
  }, [currentTaskId, tasks]);
  console.log(tasks);
  // if (currentTask) {
  //   setPriority(currentTask?.priority);
  // }
  console.log("current Pathname 👉️", window.location.pathname.split("/")[2]);
  const handleChange = (e) => {
    setPriority(e.target.value);
  };
  /* function to update firestore */
  const handleUpdate = async (e) => {
    e.preventDefault();
    const taskDocRef = doc(db, "tasks", currentTaskId);
    // console.log(id);
    try {
      await updateDoc(taskDocRef, {
        title: title ? title : currentTask?.title,
        description: description ? description : currentTask?.description,
        dueDate: dueDate ? dueDate : currentTask?.dueDate,
        priority: priority ? priority : currentTask?.priority,
      });
      navigate("/todos");
    } catch (err) {
      alert(err);
    }
  };
  console.log(priority, "hhh");

  return (
    <form onSubmit={handleUpdate} className="editTask">
      <input
        type="text"
        name="title"
        onChange={(e) => setTitle(e.target.value.toUpperCase())}
        defaultValue={currentTask?.title}
        required
      />
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        defaultValue={currentTask?.description}
      ></textarea>
      <div>
        <input
          type="radio"
          name="priority"
          onChange={handleChange}
          defaultValue="high"
          checked={priority === "high"}
        />
        high
        <input
          type="radio"
          name="priority"
          onChange={handleChange}
          defaultValue="medium"
          checked={priority === "medium"}
        />
        medium
        <input
          type="radio"
          name="priority"
          onChange={handleChange}
          defaultValue="low"
          checked={priority === "low"}
        />
        low
      </div>
      <input
        type="date"
        placeholder="Select a date"
        onChange={(e) => setDueDate(e.target.value)}
        defaultValue={currentTask?.dueDate}
        required
      />
      <button type="submit">Edit</button>
    </form>
  );
}

export default EditTask;
