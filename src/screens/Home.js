import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import TimeEntry from "../components/timeentry/TimeEntry";
import TimeInfo from "../components/timeinfo/TimeInfo";
import WeeklyReport from "../components/weeklyreport/WeeklyReport";
import { useLocalStorage } from "../GlobalFunctions";
import "./screens.css";

const Home = () => {
  const [data, setData] = useLocalStorage("user-entries", []);

  return (
    // <div className="container">
    <div className="home-container">
      <Navbar />
      <div className="home-hours">
        <TimeEntry data={data} setData={setData} />
        {/* <TimeInfo data={data} /> */}
      </div>
      <div className="home-weeklyreports">
        {/* <WeeklyReport data={data} /> */}
      </div>
    </div>
    // </div>
  );
};

export default Home;
