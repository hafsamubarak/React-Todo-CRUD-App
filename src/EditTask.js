import Modal from "./Modal";
import { useState } from "react";
import "./editTask.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { useFormik } from "formik";
import { basicSchema } from "./Schemas";

function EditTask({
  open,
  onClose,
  toEditTitle,
  toEditDescription,
  id,
  toEditPriority,
  toEditDueDate,
}) {
  const { values, handleChange, errors, touched } = useFormik({
    initialValues: {
      title: toEditTitle,
      description: toEditDescription,
      priority: toEditPriority,
      dueDate: toEditDueDate,
    },
    validationSchema: basicSchema,
  });
  const [checked] = useState(true);

  /* function to update firestore */
  console.log(values.priority);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const taskDocRef = doc(db, "tasks", id);
    try {
      await updateDoc(taskDocRef, {
        title: values.title,
        description: values.description,
        dueDate: values.dueDate,
        priority: values.priority,
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
          onChange={handleChange}
          value={values.title}
          className={errors.title && touched.title ? "input-error" : ""}
          required
        />
        {errors.title && touched.title && (
          <p className="error">{errors.title}</p>
        )}
        <textarea onChange={handleChange} value={values.description}></textarea>
        <div>
          <input
            type="radio"
            name="high"
            onChange={handleChange}
            value="high"
            checked={values.priority === "high" ? checked : !checked}
          />
          high
          <input
            type="radio"
            name="medium"
            onChange={handleChange}
            value="medium"
            checked={values.priority === "medium" ? checked : !checked}
          />
          medium
          <input
            type="radio"
            name="low"
            onChange={handleChange}
            value="low"
            checked={values.priority === "low" ? checked : !checked}
          />
          low
        </div>
        <input
          type="date"
          name="dueDate"
          placeholder="Select a date"
          onChange={handleChange}
          value={values.dueDate}
          className={errors.dueDate && touched.dueDate ? "input-error" : ""}
          required
        />
        <button type="submit">Edit</button>
      </form>
    </Modal>
  );
}

export default EditTask;
