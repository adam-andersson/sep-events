import React from "react";

import "react-datepicker/dist/react-datepicker.css";
import EventPlan from "../models/event";

const EventDisplay: React.FC<{
  events: EventPlan[];
  updateActiveEvent: (eventId: string) => void;
}> = ({ events, updateActiveEvent }) => {
  return (
    <div style={{ margin: "30px", display: "flex", gap: "30px" }}>
      {events.map((event: EventPlan) => {
        const {
          status,
          clientName,
          startDate,
          endDate,
          eventType,
          attendees,
          budget,
        } = event;
        return (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <h2>Event</h2>
            <div>
              <b>Client Name:</b> {clientName}
            </div>
            <div>
              <b>Status:</b> {status}
            </div>
            <div>
              <b>Start Date:</b> {`${startDate}`}
            </div>
            <div>
              <b>End Date:</b> {`${endDate}`}
            </div>
            <div>
              <b>Event Type:</b> {eventType}
            </div>
            <div>
              <b>Attendees:</b> {attendees}
            </div>
            <div>
              <b>Budget:</b> {budget}
            </div>
            <div>
              <button onClick={() => updateActiveEvent(event.eventId)}>
                Edit Event
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventDisplay;
