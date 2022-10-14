import "./task.css";
import { useState } from "react";
import TaskItem from "./TaskItem";
import EditTask from "./EditTask";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { Link } from "react-router-dom";

function Task({
  id,
  title,
  description,
  completed,
  priority,
  dueDate,
  created,
}) {
  const [checked, setChecked] = useState(completed);
  const [open, setOpen] = useState({ edit: false, view: false });

  const handleClose = () => {
    setOpen({ edit: false, view: false });
  };

  /* function to update firestore */
  const handleChange = async () => {
    const taskDocRef = doc(db, "tasks", id);
    try {
      await updateDoc(taskDocRef, {
        completed: checked,
      });
    } catch (err) {
      alert(err);
    }
  };
  /* function to delete a document from firstore */
  const handleDelete = async () => {
    const taskDocRef = doc(db, "tasks", id);
    try {
      await deleteDoc(taskDocRef);
    } catch (err) {
      alert(err);
    }
  };
  const createdDate = new Date(created.seconds * 1000).toLocaleDateString(
    "en-US"
  );
  // console.log(id);

  return (
    <div className={`task ${checked && "task--borderColor"}`}>
      <div>
        <input
          id={`checkbox-${id}`}
          className="checkbox-custom"
          name="checkbox"
          checked={checked}
          onChange={handleChange}
          type="checkbox"
        />
        <label
          htmlFor={`checkbox-${id}`}
          className="checkbox-custom-label"
          onClick={() => setChecked(!checked)}
        ></label>
      </div>
      <div className="task__body">
        <h2 style={{ textDecoration: checked ? "line-through" : "" }}>
          Title: {title}
        </h2>
        <p>Decription: {description}</p>
        <h4>Priority: {priority}</h4>
        <h4>Due Date: {dueDate}</h4>
        <h4>Created Date: {createdDate}</h4>
        {checked ? <h5>Completed</h5> : <h5>Not Completed</h5>}
        <div className="task__buttons">
          <div className="task__deleteNedit">
            <Link className="task__editButton" to={`/edit/${id}`}>
              Edit
            </Link>
            <button className="task__deleteButton" onClick={handleDelete}>
              Delete
            </button>
          </div>
          <button onClick={() => setOpen({ ...open, view: true })}>View</button>
        </div>
      </div>
      {open.view && (
        <TaskItem
          onClose={handleClose}
          title={title}
          description={description}
          priority={priority}
          dueDate={dueDate}
          created={createdDate}
          completed={completed}
          open={open.view}
        />
      )}

      {/* {open.edit && (
        <EditTask
          onClose={handleClose}
          toEditTitle={title}
          toEditDescription={description}
          toEditPriority={priority}
          toEditDueDate={dueDate}
          open={open.edit}
          id={id}
        />
      )} */}
    </div>
  );
}

export default Task;
