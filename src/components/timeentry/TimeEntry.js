import React, { useState } from "react";
import { weekNumber } from "weeknumber";
import { Link } from "react-router-dom";
import { getUniqueCustomers, getUniqueProjects } from "../../GlobalFunctions";
import TimeInfo from "../timeinfo/TimeInfo";
import WeeklyReport from "../weeklyreport/WeeklyReport";
import "./TimeEntry.css";

const TimeEntry = (props) => {
  const [entry, setEntry] = useState({
    customer: "",
    project: "",
    description: "",
    date: new Date(),
    hours: "",
    comment: "",
  });
  console.log(props.data.length);

  const [customerAuto, setCustomerAuto] = useState(false);
  const [projectAuto, setProjectAuto] = useState(false);

  const [isAdded, setIsAdded] = useState(false);
  const unique_customers = getUniqueCustomers(props.data);
  const unique_projects = getUniqueProjects(props.data);

  const addEntry = (entry) => {
    let all_entries = props.data;
    if (all_entries == null) {
      all_entries = [];
    }
    let week_number = weekNumber(new Date(entry.date));
    let entries_list = [];
    let week_exists = false;

    Object.values(all_entries).map((row) => {
      if (row.week === week_number) {
        row.entries.push(entry);
        week_exists = true;
      }
    });
    if (!week_exists) {
      entries_list.push(entry);
      let new_entry = { week: week_number, entries: entries_list };
      all_entries.push(new_entry);
    }

    // window.localStorage.setItem("user-entries", JSON.stringify(all_entries));
    props.setData(all_entries);
    setEntry({
      customer: "",
      project: "",
      description: "",
      date: new Date(),
      hours: "",
      comment: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEntry(entry);
    setIsAdded(true);
    // window.location.reload();
  };

  const handleChange = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  return (
    <div className="home-container">
      <div className="time-container">
        <div className="timeentry-form-wrapper">
          <div className="timeentry-form-text">Før opp nye timer</div>
          <form className="timeentry-form" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-inputs">
              <div className="dropdown-wrapper">
                <input
                  type="text"
                  placeholder="Kunde"
                  name="customer"
                  value={entry.customer}
                  required
                  onChange={(e) => handleChange(e)}
                  onFocus={() => {
                    setCustomerAuto(true);
                    setProjectAuto(false);
                  }}
                  // onBlur={() => setCustomerAuto(false)}
                  // onMouseLeave={() => setCustomerAuto(false)}
                />
                <ul>
                  {customerAuto && unique_customers.length > 0
                    ? unique_customers.map((item, i) => (
                        <li
                          key={i}
                          onClick={() => {
                            setEntry({ ...entry, ["customer"]: item });
                            setCustomerAuto(false);
                          }}
                        >
                          {item}
                        </li>
                      ))
                    : null}
                  {customerAuto && unique_customers.length > 0 && (
                    <li
                      onClick={() => setCustomerAuto(false)}
                      style={{ fontSize: "10px", textAlign: "right" }}
                    >
                      Lukk
                    </li>
                  )}
                </ul>
                {/* <button
              onClick={() =>
                customerAuto ? setCustomerAuto(false) : setCustomerAuto(true)
              }
            /> */}
              </div>

              <div className="dropdown-wrapper">
                <input
                  type="text"
                  placeholder="Prosjekt"
                  name="project"
                  value={entry.project}
                  required
                  onChange={(e) => handleChange(e)}
                  onFocus={() => {
                    setProjectAuto(true);
                    setCustomerAuto(false);
                  }}
                />
                <ul>
                  {projectAuto && unique_projects.length > 0
                    ? unique_projects.map((item, i) => (
                        <li
                          key={i}
                          onClick={() => {
                            setEntry({ ...entry, ["project"]: item });
                            setProjectAuto(false);
                          }}
                        >
                          {item}
                        </li>
                      ))
                    : null}
                  {projectAuto && unique_projects.length > 0 && (
                    <li
                      onClick={() => setProjectAuto(false)}
                      style={{ fontSize: "10px", textAlign: "right" }}
                    >
                      Lukk
                    </li>
                  )}
                </ul>
              </div>

              <input
                type="text"
                placeholder="Beskrivelse"
                name="description"
                value={entry.description}
                required
                onChange={(e) => handleChange(e)}
                onFocus={() => {
                  setProjectAuto(false);
                  setCustomerAuto(false);
                }}
              />
              <input
                type="date"
                placeholder="Dato"
                name="date"
                value={entry.date}
                required
                onChange={(e) => handleChange(e)}
                onFocus={() => {
                  setProjectAuto(false);
                  setCustomerAuto(false);
                }}
              />
              <input
                type="number"
                placeholder="Antall timer"
                name="hours"
                value={entry.hours}
                required
                onChange={(e) => handleChange(e)}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onFocus={() => {
                  setProjectAuto(false);
                  setCustomerAuto(false);
                }}
              />
              <input
                type="text"
                placeholder="Kommentar"
                name="comment"
                value={entry.comment}
                onChange={(e) => handleChange(e)}
                onFocus={() => {
                  setProjectAuto(false);
                  setCustomerAuto(false);
                }}
              />
            </div>
            <div className="form-footer">
              <button type="submit" className="timeentry-form-button">
                Legg til
              </button>
              {isAdded && (
                <div style={{ marginLeft: "30px" }}>Timene er nå lagt til!</div>
              )}
            </div>
          </form>
        </div>
        <TimeInfo data={props.data} />
      </div>
      <div className="weeklyreports-container">
        <WeeklyReport data={props.data} />
      </div>
      {props.data.length > 0 && (
        <Link to="/admin" style={{ color: "#1d1d1d", textDecoration: "none" }}>
          <button className="info-button">
            Administrer kunder og prosjekter
          </button>
        </Link>
      )}
    </div>
  );
};

export default TimeEntry;
