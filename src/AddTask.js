import "./addTask.css";
import { auth, db } from "./Firebase";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFormik } from "formik";
import { basicSchema } from "./Schemas";
import { useNavigate } from "react-router-dom";

function AddTask() {
  const { values, handleBlur, handleChange, errors, touched } = useFormik({
    initialValues: {
      title: "",
      description: "",
      priority: "",
      dueDate: new Date(),
    },
    validationSchema: basicSchema,
  });
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      await addDoc(collection(db, "tasks"), {
        title: values.title,
        description: values.description,
        completed: false,
        created: Timestamp.now(),
        priority: values.priority,
        dueDate: values.dueDate,
        uid: data.uid,
        // owner: user.uid,
      });
      navigate("/todos");
    } catch (err) {
      alert(err);
    }
  };

  return (
    // <Modal modalLable="Add Task" onClose={onClose} open={open}>
    <form onSubmit={handleSubmit} className="addTask" name="addTask">
      <input
        type="text"
        className={errors.title && touched.title ? "input-error" : ""}
        name="title"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.title}
        placeholder="Enter title"
        required
      />
      {errors.title && touched.title && <p className="error">{errors.title}</p>}

      <textarea
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Enter task decription"
        value={values.description}
        name="description"
      ></textarea>
      <div>
        <input
          type="radio"
          value="high"
          name="priority"
          onChange={handleChange}
          onBlur={handleBlur}
          checked={values.priority === "high"}
          required
        />{" "}
        high
        <input
          type="radio"
          value="medium"
          name="priority"
          onChange={handleChange}
          onBlur={handleBlur}
          checked={values.priority === "medium"}
          required
        />{" "}
        medium
        <input
          type="radio"
          value="low"
          name="priority"
          onChange={handleChange}
          onBlur={handleBlur}
          checked={values.priority === "low"}
          required
        />{" "}
        low
      </div>
      <input
        type="date"
        name="dueDate"
        value={values.dueDate}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      <button type="submit">Done</button>
    </form>
    // </Modal>
  );
}

export default AddTask;
