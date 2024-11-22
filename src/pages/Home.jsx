import React, { useState, useEffect } from "react"; //useEffect for saving data in local storage
import { useLoaderData } from "react-router-dom"; //handle state management/data through local storage
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import ArchivedTasks from "../components/ArchivedTasks";
import "./Home.css";

function Home() {
  const { tasks: initialTasks, archivedTasks: initialArchivedTasks } =
    useLoaderData();
  const [tasks, setTasks] = useState(initialTasks); //state to manage current list of active tasks
  const [archivedTasks, setArchivedTasks] = useState(initialArchivedTasks); //state to manage archived
  const [filter, setFilter] = useState({
    completed: "all",
    priority: "all",
    deadline: null,
  }); //state to manage filtered

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]); //save the tasks and archived tasks to the browsers local storage

  useEffect(() => {
    localStorage.setItem("archivedTasks", JSON.stringify(archivedTasks));
  }, [archivedTasks]);

  const addTask = (task) => setTasks([...tasks, task]); //add a new task to the tasks array using spread

  const updateTask = (updatedTask) =>
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );

  const removeTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  const archiveTask = (id) => {
    const taskToArchive = tasks.find((task) => task.id === id);
    setArchivedTasks([...archivedTasks, taskToArchive]);
    removeTask(id);
  };

  const filteredTasks = tasks.filter((task) => {
    const byCompletion =
      filter.completed === "all" ||
      task.completed === (filter.completed === "true");

    const byPriority =
      filter.priority === "all" || task.priority === filter.priority;

    const byDeadline =
      !filter.deadline || new Date(task.deadline) <= new Date(filter.deadline);

    return byCompletion && byPriority && byDeadline;
  }); //filtering tasks by completion, priority, and deadline

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <TaskForm addTask={addTask} />
      <div className="filters">
        <label>
          Completion:
          <select
            onChange={(e) =>
              setFilter({ ...filter, completed: e.target.value })
            }
          >
            <option value="all">All</option>
            <option value="true">Completed</option>
            <option value="false">Incomplete</option>
          </select>
        </label>
        <label>
          Priority:
          <select
            onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
          >
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>
        <label>
          Deadline:
          <input
            type="date"
            onChange={(e) => setFilter({ ...filter, deadline: e.target.value })}
          />
        </label>
      </div>
      <TaskList
        tasks={filteredTasks}
        updateTask={updateTask}
        removeTask={removeTask}
        archiveTask={archiveTask}
      />
      {/* displays tasks that match the filter criteria */}
      <ArchivedTasks archivedTasks={archivedTasks} />
    </div>
  );
}

export default Home;
