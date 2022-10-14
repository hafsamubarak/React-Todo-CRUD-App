import "./taskManager.css";
import Task from "../Task";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { auth, db } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";

function TaskManager() {
  const [date, setDate] = useState("");
  const [filterOptions, setFilterOptions] = useState("select");
  const [searchValue, setSearchValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [user] = useAuthState(auth);
  // console.log(user);
  const navigate = useNavigate();
  if (!user) navigate("/login");

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    const taskColRef = query(
      collection(db, "tasks"),
      // where("owner", "==", user.uid),
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

  const onFilterChange = (e) => {
    setFilterOptions(e.target.value);
  };
  return (
    <>
      <input
        type="text"
        placeholder="serach by title"
        onChange={(e) => setSearchValue(e.target.value)}
        style={{ width: "50%" }}
      />
      <input
        type="date"
        placeholder="Search by date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ width: "50%" }}
      />

      <div>
        <select onChange={onFilterChange} style={{ width: "51%" }}>
          <option value="select">Select a filter</option>
          <optgroup label="Done Status">
            <option value="completed">Completed</option>
            <option value="notCompleted">Not Completed</option>
          </optgroup>
          <optgroup label="Priority">
            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </optgroup>
          <optgroup label="Due Date">
            <option value="ascendingDate">Ascending Date</option>
            <option value="descendingDate">Descending Date</option>
          </optgroup>
        </select>
      </div>
      <div className="taskManager">
        <div className="taskManager__container">
          <Link to="/addTask">Add task +</Link>
          <div className="taskManager__tasks">
            {tasks
              .filter(
                (oneTask) => oneTask.data.uid === localStorage.getItem("user")
              )
              .filter((item) => {
                if (searchValue === "") {
                  return item;
                } else if (
                  item.data.title
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
                ) {
                  return item;
                }
              })
              .filter((d) => {
                if (date === "") {
                  return d;
                } else if (d.data.dueDate === date) {
                  return d;
                }
              })
              .filter((task) => {
                if (filterOptions === "completed") {
                  return task?.data?.completed === true;
                } else if (filterOptions === "notCompleted") {
                  return task?.data?.completed === false;
                } else if (filterOptions === "high") {
                  return task?.data?.priority === "high";
                } else if (filterOptions === "medium") {
                  return task?.data?.priority === "medium";
                } else if (filterOptions === "low") {
                  return task?.data?.priority === "low";
                } else if (filterOptions === "ascendingDate") {
                  return tasks.sort(
                    (val1, val2) =>
                      +new Date(val1.data.dueDate) -
                      +new Date(val2.data.dueDate)
                  );
                } else if (filterOptions === "descendingDate") {
                  return tasks.sort(
                    (val1, val2) =>
                      +new Date(val2.data.dueDate) -
                      +new Date(val1.data.dueDate)
                  );
                } else {
                  return task;
                }
              })

              .map((task) => (
                <Task
                  id={task.id}
                  key={task.id}
                  completed={task.data.completed}
                  title={task.data.title}
                  description={task.data.description}
                  priority={task.data.priority}
                  dueDate={task.data.dueDate}
                  created={task.data.created}
                />
              ))}
          </div>
        </div>

        {/* {openAddModal && (
          <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal} />
        )} */}
      </div>
    </>
  );
}

export default TaskManager;
