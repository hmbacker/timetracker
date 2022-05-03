import React from "react";
import Navbar from "../components/navbar/Navbar";
import TimeEntry from "../components/timeentry/TimeEntry";
import TimeInfo from "../components/timeinfo/TimeInfo";
import WeeklyReport from "../components/weeklyreport/WeeklyReport";
import "./screens.css";

const Home = () => {
  return (
    // <div className="container">
    <div className="home-container">
      <Navbar />
      <div className="home-hours">
        <TimeEntry />
        <TimeInfo />
      </div>
      <div className="home-weeklyreports">
        <WeeklyReport />
      </div>
    </div>
    // </div>
  );
};

export default Home;
