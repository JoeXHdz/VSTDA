import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom"; //used to render nested route components 

const App = () => {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  );
};
export default App;
