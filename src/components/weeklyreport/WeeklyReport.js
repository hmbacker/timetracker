import React, { useState } from "react";
import TimeList from "../timelist/TimeList";
import { CSVLink } from "react-csv";
import "./WeeklyReport.css";

const WeeklyReport = () => {
  // const [expand, setExpand] = useState(false);

  let data = {};
  let json_data = JSON.parse(localStorage.getItem("user-entries"));

  if (json_data) {
    data = json_data.reverse();
  }
  // console.log(data);

  function getWeeklyHours(row) {
    let weekly_hours = 0;
    Object.values(row.entries).map((value) => {
      weekly_hours += parseInt(value.hours);
    });
    return weekly_hours;
  }

  const reports = Object.values(data).map((row, index) => {
    // console.log(row.entries);
    let weekly_hours = getWeeklyHours(row);
    return (
      <div
        className="week-container"
        key={index}
        // onClick={() => (expand ? setExpand(false) : setExpand(true))}
      >
        {/* {!expand && ( */}
        <div className="week-info">
          <div className="week-number">Uke {row.week}</div>
          <div className="week-hours">
            {weekly_hours}{" "}
            <p style={{ fontSize: "11px", marginLeft: "5px" }}>timer totalt</p>
          </div>
          <div className="week-csv">
            <CSVLink
              data={row.entries}
              filename={"timerapport_uke_" + row.week}
              enclosingCharacter={""}
              style={{ color: "#f1f1f1", fontSize: "12px" }}
            >
              Eksporter til .csv
            </CSVLink>
          </div>
        </div>
        {/* )} */}
        <TimeList data={row.entries} />
      </div>
    );
  });

  return <div className="weekly-container">{reports}</div>;
};

export default WeeklyReport;
