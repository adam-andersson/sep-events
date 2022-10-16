import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import EventPlan from "../models/event";
import { EventStatus, isOfTypeEventStatus } from "../types/eventStatus";

const EventPlanning: React.FC<{
  event: EventPlan | null;
  isEditing: boolean;
  handleUpdateEvent: (
    clientName: string,
    status: EventStatus,
    eventType: string,
    startDate: Date,
    endDate: Date,
    attendees: number,
    budget: number
  ) => void;
  handleNewEvent: (
    clientName: string,
    status: EventStatus,
    eventType: string,
    startDate: Date,
    endDate: Date,
    attendees: number,
    budget: number
  ) => void;
  handleOnBack: () => void;
}> = ({
  event,
  isEditing,
  handleUpdateEvent,
  handleNewEvent,
  handleOnBack,
}) => {
  const [clientName, setClientName] = useState<string>("");
  const [status, setStatus] = useState<EventStatus>("Pending");
  const [eventType, setEventType] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [attendees, setAttendees] = useState<number>(0);
  const [budget, setBudget] = useState<number>(0);

  useEffect(() => {
    if (isEditing && event) {
      setClientName(event.clientName);
      setStatus(event.status);
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
        status,
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
        status,
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
        onReset={handleOnBack}
        style={{ display: "flex", flexDirection: "column", gap: "5px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3px",
          }}
        >
          <label>Client Name</label>
          <input
            type="text"
            onChange={(cn) => setClientName(cn.target.value)}
            value={clientName}
          ></input>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3px",
          }}
        >
          <label>Status</label>
          <select
            onChange={(statusChangeEvent) => {
              if (isOfTypeEventStatus(statusChangeEvent.target.value))
                setStatus(statusChangeEvent.target.value);
            }}
            value={status}
          >
            <option value={"Pending"}>Pending</option>
            <option value={"Accepted"}>Accepted</option>
            <option value={"Rejected"}>Rejected</option>
          </select>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5px",
          }}
        >
          <label>Event Type</label>
          <input
            type="text"
            onChange={(et) => setEventType(et.target.value)}
            value={eventType}
          ></input>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5px",
          }}
        >
          <label>Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5px",
          }}
        >
          <label>End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5px",
          }}
        >
          <label>Expected attendees</label>
          <input
            type="number"
            onChange={(at) => {
              const newAttendees = parseInt(at.target.value, 10);
              setAttendees(newAttendees);
            }}
            value={attendees}
          ></input>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5px",
          }}
        >
          <label>Expected budget</label>
          <input
            type="number"
            onChange={(bu) => {
              const newBudget = parseInt(bu.target.value, 10);
              setBudget(newBudget);
            }}
            value={budget}
          ></input>
        </div>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          <input type="submit"></input>
          <input type="reset" value="Back"></input>
        </div>
      </form>
    </div>
  );
};

export default EventPlanning;
