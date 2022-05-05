import React, { useState } from "react";
import { weekNumber } from "weeknumber";
import {
  getUniqueCustomers,
  getUniqueProjects,
  // useLocalStorage,
} from "../../GlobalFunctions";
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

  // const [data, setData] = useLocalStorage("user-entries", [
  //   // {
  //   //   week: "",
  //   //   entries: [],
  //   // },
  // ]);

  const [customerAuto, setCustomerAuto] = useState(false);
  const [projectAuto, setProjectAuto] = useState(false);

  const [isAdded, setIsAdded] = useState(false);
  // const [customers, setCustomers] = useState(["test", "henrik", "backer"]);
  // const [data, setData] = useLocalStorage("user-entries", "[]");

  const unique_customers = getUniqueCustomers();
  const unique_projects = getUniqueProjects();
  // const unique_customers = ["Test", "Henrik", "Backer"];
  // const unique_projects = ["P1", "P2"];

  const addEntry = (entry) => {
    // let all_entries = JSON.parse(localStorage.getItem("user-entries"));
    // let all_entries = props.data;
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

    window.localStorage.setItem("user-entries", JSON.stringify(all_entries));
    // setData(all_entries);
  };

  const handleSubmit = (e) => {
    // console.log(entry);
    e.preventDefault();
    addEntry(entry);
    setIsAdded(true);
    // window.location.reload();
  };

  const handleChange = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  return (
    // <div className="timeentry-container">
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
              {customerAuto
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
              {customerAuto && (
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
              // onBlur={() => setProjectAuto(false)}
              // onMouseLeave={() => setProjectAuto(false)}
            />
            <ul>
              {projectAuto
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
              {projectAuto && (
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
    // </div>
  );
};

export default TimeEntry;
