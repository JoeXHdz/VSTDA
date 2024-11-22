import React from "react";
import { Pie } from "react-chartjs-2";
import { useLoaderData } from "react-router-dom";
import { Chart, CategoryScale, ArcElement, Tooltip, Legend } from "chart.js";
import "./Dashboard.css";

// Register required components with Chart.js
Chart.register(CategoryScale, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const loadedData = useLoaderData();

  const data = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        label: "Task Priority Distribution",
        data: [
          loadedData.tasks.filter((task) => task.priority === "high").length,
          loadedData.tasks.filter((task) => task.priority === "medium").length,
          loadedData.tasks.filter((task) => task.priority === "low").length,
        ],
        backgroundColor: ["#FF6384", "#FFCE56", "#36A2EB"]
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#e1ca96",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`,
        },
      },
    },
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <Pie data={data} options={options} />
    </div>
  );
};

export default Dashboard;
