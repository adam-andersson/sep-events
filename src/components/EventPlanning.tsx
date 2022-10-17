import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import EventPlan from "../models/event";
import { EventStatus, isOfTypeEventStatus } from "../types/eventStatus";

const EventPlanning: React.FC<{
  event: EventPlan | null;
  isEditing: boolean;
  canEditEventDetails: boolean;
  canAddFinancialComments: boolean;
  canRedirectToFinancialManager: boolean;
  canRedirectToAdministrationManager: boolean;
  canRejectEvent: boolean;
  canAcceptEvent: boolean;
  handleUpdateEvent: (
    clientName: string,
    status: EventStatus,
    eventType: string,
    startDate: Date,
    endDate: Date,
    attendees: number,
    budget: number,
    financialComment: string
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
  canEditEventDetails,
  canAddFinancialComments,
  canRedirectToFinancialManager,
  canRedirectToAdministrationManager,
  canRejectEvent,
  canAcceptEvent,
  handleUpdateEvent,
  handleNewEvent,
  handleOnBack,
}) => {
  const [clientName, setClientName] = useState<string>("");
  const [status, setStatus] = useState<EventStatus>("Pending");
  const [eventType, setEventType] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [attendees, setAttendees] = useState<number>(1);
  const [budget, setBudget] = useState<number>(1);
  const [financialComment, setFinancialComment] = useState<string>("");

  useEffect(() => {
    if (isEditing && event) {
      setClientName(event.clientName);
      setStatus(event.status);
      setEventType(event.eventType);
      setStartDate(event.startDate);
      setEndDate(event.endDate);
      setAttendees(event.attendees);
      setBudget(event.budget);
      setFinancialComment(event.comments);
    }
  }, [event, isEditing]);

  useEffect(() => {
    if (endDate.getTime() < startDate.getTime()) setEndDate(startDate);
  }, [endDate, startDate]);

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
        budget,
        financialComment
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
            disabled={!canEditEventDetails}
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
            disabled={
              !(
                canRedirectToFinancialManager ||
                canRejectEvent ||
                canRedirectToAdministrationManager
              )
            }
          >
            <option value={"Pending"}>Pending</option>
            <option
              value={"Under Financial Review"}
              disabled={!canRedirectToFinancialManager}
            >
              Needs Financial Review
            </option>
            <option
              value={"Under Administration Review"}
              disabled={!canRedirectToAdministrationManager}
            >
              Needs Administration Review
            </option>
            <option value={"Accepted"} disabled={!canAcceptEvent}>
              Accepted
            </option>
            <option value={"Rejected"} disabled={!canRejectEvent || !isEditing}>
              Rejected
            </option>
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
            disabled={!canEditEventDetails}
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
            dateFormat="yyyy/MM/dd"
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            disabled={!canEditEventDetails}
            minDate={new Date()}
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
            dateFormat="yyyy/MM/dd"
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            disabled={!canEditEventDetails}
            minDate={startDate}
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
            value={`${attendees}`}
            min="1"
            disabled={!canEditEventDetails}
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
            value={`${budget}`}
            min="1"
            disabled={!canEditEventDetails}
          ></input>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5px",
          }}
        >
          <label>Financial Comment</label>
          <textarea
            onChange={(fc) => {
              setFinancialComment(fc.target.value);
            }}
            value={financialComment}
            disabled={!canAddFinancialComments}
          ></textarea>
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
