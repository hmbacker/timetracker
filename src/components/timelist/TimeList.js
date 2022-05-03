import React, { useState } from "react";
import "./TimeList.css";

const TimeList = (props) => {
  // let data = {};
  // let json_data = JSON.parse(localStorage.getItem("user-entries"));

  // if (json_data) {
  //   data = json_data.reverse();
  // }

  const [expand, setExpand] = useState(false);

  const time_list = Object.values(props.data).map((row, index) => {
    return (
      <div className="list-container" key={index}>
        <div>{row.customer}</div>
        <div>{row.project}</div>
        <div>{row.description}</div>
        <div>{row.date}</div>
        <div>{row.hours}</div>
        <div>{row.comment}</div>
      </div>
    );
  });

  // console.log(props.data);

  return (
    <div
      className="timelist-container"
      onClick={() => (expand ? setExpand(false) : setExpand(true))}
    >
      {!expand && <div style={{ marginRight: "20px" }}>Åpne rapport</div>}
      {expand && (
        <div style={{ marginRight: "20px", marginBottom: "20px" }}>
          Lukk rapport
        </div>
      )}
      {expand && (
        <div className="timelist">
          <div className="timelist-columns">
            <p>Kunde</p>
            <p>Prosjekt</p>
            <p>Beskrivelse</p>
            <p>Dato</p>
            <p>Timer</p>
            <p>Kommentar</p>
          </div>
          <div className="line" />
          <div className="timelist-list">{time_list}</div>
        </div>
      )}
    </div>
  );
};

export default TimeList;
