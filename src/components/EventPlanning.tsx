import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import EventPlan from "../models/event";

const EventPlanning: React.FC<{
  event: EventPlan | null;
  isEditing: boolean;
  handleUpdateEvent: (
    clientName: string,
    eventType: string,
    startDate: Date,
    endDate: Date,
    attendees: number,
    budget: number
  ) => void;
  handleNewEvent: (
    clientName: string,
    eventType: string,
    startDate: Date,
    endDate: Date,
    attendees: number,
    budget: number
  ) => void;
}> = ({ event, isEditing, handleUpdateEvent, handleNewEvent }) => {
  const [clientName, setClientName] = useState<string>("");
  const [eventType, setEventType] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [attendees, setAttendees] = useState<number>(0);
  const [budget, setBudget] = useState<number>(0);

  useEffect(() => {
    if (isEditing && event) {
      setClientName(event.clientName);
      setEventType(event.eventType);
      setStartDate(event.startDate);
      setEndDate(event.endDate);
      setAttendees(event.attendees);
      setBudget(event.budget);
    }
  }, [event, isEditing]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEditing) {
      handleUpdateEvent(
        clientName,
        eventType,
        startDate,
        endDate,
        attendees,
        budget
      );
    } else {
      // we are creating a new event
      handleNewEvent(
        clientName,
        eventType,
        startDate,
        endDate,
        attendees,
        budget
      );
    }
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
            value={clientName}
          ></input>
        </div>
        <div>
          <label>Event Type:</label>
          <input
            type="text"
            onChange={(et) => setEventType(et.target.value)}
            value={eventType}
          ></input>
        </div>
        <label>Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
        />
        <label>End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
        />
        <div>
          <label>Expected number of attendees:</label>
          <input
            type="number"
            onChange={(at) => {
              const newAttendees = parseInt(at.target.value, 10);
              setAttendees(newAttendees);
            }}
            value={attendees}
          ></input>
        </div>
        <div>
          <label>Expected budget:</label>
          <input
            type="number"
            onChange={(bu) => {
              const newBudget = parseInt(bu.target.value, 10);
              setBudget(newBudget);
            }}
            value={budget}
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
