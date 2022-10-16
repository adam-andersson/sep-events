import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const EventPlanning = ({ user, events, handleNewEvent }) => {
  const [clientName, setClientName] = useState("");
  const [eventType, setEventType] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [attendees, setAttendees] = useState(0);
  const [budget, setBudget] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleNewEvent(
      clientName,
      eventType,
      startDate,
      endDate,
      attendees,
      budget
    );
  };

  return (
    <div style={{ margin: "30px" }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "5px" }}
      >
        <div>
          <label>Client Name:</label>
          <input
            type="text"
            onChange={(cn) => setClientName(cn.target.value)}
          ></input>
        </div>
        <div>
          <label>Event Type:</label>
          <input
            type="text"
            onChange={(et) => setEventType(et.target.value)}
          ></input>
        </div>
        <label>Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <label>End Date:</label>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        <div>
          <label>Expected number of attendees:</label>
          <input
            type="number"
            onChange={(at) => setAttendees(at.target.value)}
          ></input>
        </div>
        <div>
          <label>Expected budget:</label>
          <input
            type="number"
            onChange={(bu) => setBudget(bu.target.value)}
          ></input>
        </div>
        <div>
          <input type="submit"></input>
        </div>
      </form>
    </div>
  );
};

export default EventPlanning;
