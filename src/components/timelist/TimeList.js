import React, { useState } from "react";
import "./TimeList.css";

const TimeList = (props) => {
  // let data = {};
  // let json_data = JSON.parse(localStorage.getItem("user-entries"));

  // if (json_data) {
  //   data = json_data.reverse();
  // }

  const [expand, setExpand] = useState(false);

  let time_list = [];

  try {
    time_list = Object.values(props.data).map((row, index) => {
      return (
        <div className="list-container" key={index}>
          <div>{row.customer}</div>
          <div>{row.project}</div>
          <div id="description">{row.description}</div>
          <div>{row.date}</div>
          <div>{row.hours}</div>
          <div id="comment">{row.comment}</div>
        </div>
      );
    });
  } catch (e) {
    console.log(e);
  }

  // console.log(props.data);

  let time_list_summary = [];
  let all_customers = {};
  try {
    Object.values(props.data).map((row, index) => {
      if (row.customer in all_customers) {
        all_customers[row.customer] += parseInt(row.hours);
      } else {
        all_customers[row.customer] = parseInt(row.hours);
      }
    });
    time_list_summary = Object.entries(all_customers).map((customer, index) => {
      return (
        <div className="list-container" key={index}>
          <div>{customer[0]}</div>
          <div>{customer[1]}</div>
        </div>
      );
    });
  } catch (e) {}

  return (
    <div
      className="timelist-container"
      onClick={() => (expand ? setExpand(false) : setExpand(true))}
    >
      {!expand && <div style={{ marginRight: "8px" }}>Åpne rapport</div>}
      {expand && (
        <div style={{ marginRight: "8px", marginBottom: "20px" }}>
          Lukk rapport
        </div>
      )}
      {expand && props.detailed && (
        <div className="timelist-detailed" style={{ width: "100%" }}>
          <div className="timelist-columns">
            <p>Kunde</p>
            <p>Prosjekt</p>
            <p id="description">Beskrivelse</p>
            <p>Dato</p>
            <p>Timer</p>
            <p id="comment">Kommentar</p>
          </div>
          <div className="line" />
          <div className="timelist-list">{time_list}</div>
        </div>
      )}
      {expand && props.summary && (
        <div className="timelist-summary">
          <div className="timelist-columns">
            <p>Kunde</p>
            <p>Timer</p>
          </div>
          <div className="line" />
          <div className="timelist-list">{time_list_summary}</div>
        </div>
      )}
    </div>
  );
};

export default TimeList;
