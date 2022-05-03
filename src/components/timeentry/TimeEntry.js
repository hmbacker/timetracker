import React, { useState } from "react";
import { getWeekNumberFromDate } from "../../GlobalFunctions";
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

  const [isAdded, setIsAdded] = useState(false);

  const addEntry = (entry) => {
    let all_entries = JSON.parse(localStorage.getItem("user-entries"));
    if (all_entries == null) {
      all_entries = [];
    }
    let week_number = getWeekNumberFromDate(new Date(entry.date));
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
    // <div className="timeentry-container">
    <div className="timeentry-form-wrapper">
      <div className="timeentry-form-text">Før opp nye timer</div>
      <form className="timeentry-form" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Kunde"
          name="customer"
          value={entry.customer}
          required
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          placeholder="Prosjekt"
          name="project"
          value={entry.project}
          required
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          placeholder="Beskrivelse"
          name="description"
          value={entry.description}
          required
          onChange={(e) => handleChange(e)}
        />
        <input
          type="date"
          placeholder="Dato"
          name="date"
          value={entry.date}
          required
          onChange={(e) => handleChange(e)}
        />
        <input
          type="number"
          placeholder="Antall timer"
          name="hours"
          value={entry.hours}
          required
          onChange={(e) => handleChange(e)}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
        <input
          type="text"
          placeholder="Kommentar"
          name="comment"
          value={entry.comment}
          onChange={(e) => handleChange(e)}
        />
        {/* <div className="form-footer"> */}
        <button type="submit" className="timeentry-form-button">
          Legg til
        </button>
        {isAdded && (
          <div style={{ marginLeft: "30px" }}>Timene er nå lagt til!</div>
        )}
        {/* </div> */}
      </form>
    </div>
    // </div>
  );
};

export default TimeEntry;
