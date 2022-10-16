import React from "react";

import "react-datepicker/dist/react-datepicker.css";
import EventPlan from "../models/event";

const EventDisplay: React.FC<{
  events: EventPlan[];
  canEditEvent: boolean;
  updateActiveEvent: (eventId: string) => void;
}> = ({ events, updateActiveEvent, canEditEvent }) => {
  return (
    <div style={{ margin: "0 30px 0 30px" }}>
      <h2>List of events:</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "30px",
          overflow: "scroll",
        }}
      >
        {events.map((event: EventPlan, i) => {
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
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                border: "dashed",
                maxWidth: "350px",
                minWidth: "200px",
                padding: "10px",
              }}
              key={i}
            >
              <div>
                <b>Client Name:</b> {clientName}
              </div>
              <div>
                <b>Status:</b> {status}
              </div>
              <div>
                <b>Start Date:</b> {startDate.toDateString()}
              </div>
              <div>
                <b>End Date:</b> {endDate.toDateString()}
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
              {canEditEvent && (
                <div>
                  <button onClick={() => updateActiveEvent(event.eventId)}>
                    Edit Event
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventDisplay;
