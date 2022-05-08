import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Home from "../components/home/Home";
import TimeInfo from "../components/timeinfo/TimeInfo";
import WeeklyReport from "../components/weeklyreport/WeeklyReport";
import { useLocalStorage } from "../GlobalFunctions";
import "./screens.css";

const HomePage = () => {
  const [data, setData] = useLocalStorage("user-entries", []);
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user-token") === null) {
      navigate("/");
    }
  });

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-hours">
        <Home data={data} setData={setData} />
      </div>
    </div>
  );
};

export default HomePage;
