import React from "react";
import { Link } from "react-router-dom";
import "./TimeInfo.css";

import { weekNumber } from "weeknumber";

const TimeInfo = (props) => {
  let total_customers = 0;
  let total_projects = 0;
  let total_hours = 0;

  const current_week = weekNumber(new Date());

  try {
    let unique_customers = [];
    let unique_projects = [];

    Object.values(props.data).map((row) => {
      if (row.week === current_week) {
        Object.values(row.entries).map(
          (value) => (total_hours += parseInt(value.hours))
        );
        unique_customers = [
          ...new Set(
            Object.values(row.entries).map((row) => {
              return row.customer;
            })
          ),
        ];
        unique_projects = [
          ...new Set(
            Object.values(row.entries).map((row) => {
              return row.project;
            })
          ),
        ];
      }
    });
    total_customers = unique_customers.length;
    total_projects = unique_projects.length;
  } catch (e) {}

  return (
    <div className="info-container">
      <div className="info-week">Uke {current_week}</div>
      <div className="info-numbers-container">
        <div className="info-totalcustomers-container">
          <div className="info-totalcustomers-text">Kunder</div>
          <div className="info-totalcustomers-customers">{total_customers}</div>
        </div>
        <div className="info-totalprojects-container">
          <div className="info-totalprojects-text">Prosjekter</div>
          <div className="info-totalprojects-projects">{total_projects}</div>
        </div>
        <div className="info-totalhours-container">
          <div className="info-totalhours-text">Timer</div>
          <div className="info-totalhours-hours">{total_hours}</div>
        </div>
      </div>
      {/* <div className="info-button"> */}
      {/* <Link to="/admin" style={{ color: "#1d1d1d", textDecoration: "none" }}>
        <button className="info-button">Administrasjon</button>
      </Link> */}
      {/* </div> */}
    </div>
  );
};

export default TimeInfo;
