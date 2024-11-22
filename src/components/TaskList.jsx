import React from "react";

const TaskList = ({ tasks, updateTask, removeTask, archiveTask }) => {
  //destructered props within the holder using curly braces
  const handleEdit = (task, field, value) => {
    //declaring on change function aka handleEdit
    const updatedTask = { ...task, [field]: value }; //using spread operator to copy all values while changing field
    updateTask(updatedTask);
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li
          key={task.id} //each task needs to have unique id
          className={`task ${task.completed ? "completed" : ""}`} //dynamically adding className when map through each task
        >
          <input
            type="text"
            value={task.description}
            onChange={(e) => handleEdit(task, "description", e.target.value)} //using on change function from line 5
          />
          <input
            type="date"
            value={task.deadline}
            onChange={(e) => handleEdit(task, "deadline", e.target.value)}
          />
          <select
            value={task.priority}
            onChange={(e) => handleEdit(task, "priority", e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <label>
            Completed:
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) => handleEdit(task, "completed", e.target.checked)}
            />
          </label>
          <button onClick={() => removeTask(task.id)}>Delete</button>
          <button id="archive-btn" onClick={() => archiveTask(task.id)}>
            Archive
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
