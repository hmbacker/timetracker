import React, { useState } from "react";
import TimeList from "../timelist/TimeList";

import { CSVLink } from "react-csv";
import "./WeeklyReport.css";
import { CsvModal } from "../csvmodal/CsvModal";

const WeeklyReport = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [csvWeek, setCsvWeek] = useState(null);

  const [detailed, setDetailed] = useState(true);
  const [summary, setSummary] = useState(false);

  function getWeeklyHours(row) {
    let weekly_hours = 0;
    try {
      Object.values(row.entries).map((value) => {
        weekly_hours += parseInt(value.hours);
      });
    } catch (e) {}
    return weekly_hours;
  }

  function toggle() {
    if (detailed) {
      setDetailed(false);
      setSummary(true);
    } else {
      setDetailed(true);
      setSummary(false);
    }
  }

  let reports = [];
  try {
    reports = Object.values(props.data).map((row, index) => {
      let weekly_hours = getWeeklyHours(row);

      if (row.week !== "" && row.entries.length > 0) {
        return (
          <div className="week-container" key={index}>
            <div className="week-info">
              <div className="week-number">Uke {row.week}</div>
              <div className="week-hours">
                {weekly_hours} <p style={{ fontSize: "11px" }}>timer totalt</p>
              </div>
              <div className="week-buttons">
                <div className="week-csv">
                  {weekly_hours < 40 && (
                    <button
                      onClick={() => {
                        setModalOpen(true);
                        setCsvWeek(row.week);
                      }}
                    >
                      Eksporter til .csv
                    </button>
                  )}
                  {weekly_hours >= 40 && (
                    <CSVLink
                      data={row.entries}
                      filename={"timerapport_uke_" + row.week + ".csv"}
                      enclosingCharacter={""}
                      style={{ color: "#f1f1f1", fontSize: "12px" }}
                    >
                      Eksporter til .csv
                    </CSVLink>
                  )}
                </div>
              </div>
            </div>

            <TimeList
              data={row.entries}
              // expand={expand}
              // setExpand={setExpand}
              detailed={detailed}
              summary={summary}
            />
            {csvWeek === row.week && (
              <CsvModal
                data={row}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
              />
            )}
          </div>
        );
      }
    });
  } catch (e) {}

  return (
    <div
      className="weekly-container"
      style={summary ? { width: "70%" } : { width: "100%" }}
    >
      {reports}
      <div className="toggle-container">
        <div className="toggle-text">Vis sammendrag</div>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={summary}
            onChange={() => {
              toggle();
            }}
          />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};

export default WeeklyReport;
