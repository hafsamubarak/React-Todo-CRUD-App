import React, { useState } from "react";
import Task from "../Task";

function FilterTasks({ tasks }) {
  console.log(tasks);
  const [filterOptions, setFilterOptions] = useState("select");

  const onFilterChange = (e) => {
    // console.log(e.target.value);
    setFilterOptions(e.target.value);
  };
  return (
    <>
      <div>
        <select onChange={onFilterChange}>
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
      {tasks
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
                +new Date(val1.data.dueDate) - +new Date(val2.data.dueDate)
            );
          } else if (filterOptions === "descendingDate") {
            return tasks.sort(
              (val1, val2) =>
                +new Date(val2.data.dueDate) - +new Date(val1.data.dueDate)
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
    </>
  );
}

export default FilterTasks;
