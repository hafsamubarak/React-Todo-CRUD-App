import React, { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../Firebase";

function AddTodo({ onclose, open }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDuDate] = useState("");
  const [completed, setCompleted] = useState(false);
  // function to add new task to firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "todos"), {
        title: title,
        description: description,
        priority: priority,
        dueDate: dueDate,
        completed: false,
        created: Timestamp.now(),
      });
      onclose();
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="addTask" name="addTask"></form>
    </div>
  );
}

export default AddTodo;
