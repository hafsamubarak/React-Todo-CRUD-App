import Modal from "./Modal";
import { useState } from "react";
import "./editTask.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./Firebase";

function EditTask({
  open,
  onClose,
  toEditTitle,
  toEditDescription,
  id,
  toEditPriority,
  toEditDueDate,
}) {
  const [title, setTitle] = useState(toEditTitle);
  const [description, setDescription] = useState(toEditDescription);
  const [priority, setPriority] = useState(toEditPriority);
  const [dueDate, setDueDate] = useState(toEditDueDate);
  const [checked, setChecked] = useState(true);

  /* function to update firestore */
  console.log(priority);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const taskDocRef = doc(db, "tasks", id);
    try {
      await updateDoc(taskDocRef, {
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
      });
      onClose();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal modalLable="Edit Task" onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className="editTask">
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <div>
          <input
            type="radio"
            name="high"
            onChange={(e) => setPriority(e.target.value)}
            value="high"
            checked={priority === "high" ? checked : !checked}
          />
          high
          <input
            type="radio"
            name="medium"
            onChange={(e) => setPriority(e.target.value)}
            value="medium"
            checked={priority === "medium" ? checked : !checked}
          />
          medium
          <input
            type="radio"
            name="low"
            onChange={(e) => setPriority(e.target.value)}
            value="low"
            checked={priority === "low" ? checked : !checked}
          />
          low
        </div>
        <input
          type="date"
          placeholder="Select a date"
          onChange={(e) => setDueDate(e.target.value)}
          value={dueDate}
        />
        <button type="submit">Edit</button>
      </form>
    </Modal>
  );
}

export default EditTask;
