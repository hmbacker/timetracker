import React, { useEffect, useState } from "react";
import TimeList from "../timelist/TimeList";
import { useLocalStorage } from "../../GlobalFunctions";

import { CSVLink } from "react-csv";
import "./WeeklyReport.css";

const WeeklyReport = (props) => {
  // const [expand, setExpand] = useState(false);

  // const [lessThan40Hours, SetLessThan40Hours] = useState(true);

  // let data_object = {};

  // let json_data = props.data;

  // if (json_data) {
  //   data_object = json_data.reverse();
  // }
  // console.log(props.data.entries);
  // const [data, setData] = useLocalStorage("user-entries", [
  //   // {
  //   //   week: "",
  //   //   entries: [],
  //   // },
  // ]);

  function getWeeklyHours(row) {
    let weekly_hours = 0;
    try {
      Object.values(row.entries).map((value) => {
        weekly_hours += parseInt(value.hours);
      });
    } catch (e) {
      // console.log(e);
    }

    return weekly_hours;
  }

  // if (weekly_hours < 40) {
  //   SetLessThan40Hours(true);
  // }

  let reports = [];
  try {
    reports = Object.values(props.data).map((row, index) => {
      // console.log(row.entries);
      let weekly_hours = getWeeklyHours(row);

      return (
        <div className="week-container" key={index}>
          <div className="week-info">
            <div className="week-number">Uke {row.week}</div>
            <div className="week-hours">
              {weekly_hours}{" "}
              <p style={{ fontSize: "11px", marginLeft: "5px" }}>
                timer totalt
              </p>
            </div>
            <div className="week-csv">
              <CSVLink
                data={row.entries}
                filename={"timerapport_uke_" + row.week + ".csv"}
                enclosingCharacter={""}
                style={{ color: "#f1f1f1", fontSize: "12px" }}
              >
                Eksporter til .csv
              </CSVLink>
            </div>
          </div>

          <TimeList data={row.entries} />
        </div>
      );
    });
  } catch (e) {
    // console.log(e);
  }

  return <div className="weekly-container">{reports}</div>;
};

export default WeeklyReport;
