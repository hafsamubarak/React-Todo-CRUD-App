import { useState } from "react";
import Modal from "./Modal";
import "./taskItem.css";

function TaskItem({
  onClose,
  open,
  title,
  description,
  priority,
  dueDate,
  created,
  completed,
}) {
  const [checked] = useState(completed);
  return (
    <Modal modalLable="Task Item" onClose={onClose} open={open}>
      <div className="taskItem">
        <h2>Title: {title}</h2>
        <p>Description: {description}</p>
        <h5>Priority: {priority}</h5>
        <h5>Due Date: {dueDate}</h5>
        <h5>Created Date: {created}</h5>
        {checked ? <h5>Completed</h5> : <h5>Not Completed</h5>}
      </div>
    </Modal>
  );
}

export default TaskItem;
