import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [description, setDescription] = useState(""); //First element is the value; Second calls for a function to set the contents (description)
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("low");
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      description,
      deadline,
      priority,
      completed,
    };
    addTask(newTask); //these essentially reset the forms use state values
    setDescription("");
    setDeadline("");
    setPriority("low");
    setCompleted(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Description" //Sets the intial state so we use empty "" in line 4
        value={description} //Calls for values in line 4
        onChange={(e) => setDescription(e.target.value)} //funtion for setDescription is called at the value when input field has changed
        required
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <label>
        Completed:
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
      </label>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
