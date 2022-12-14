import React from "react";

import "react-datepicker/dist/react-datepicker.css";
import EventPlan from "../models/event";

const EventDisplay: React.FC<{
  events: EventPlan[];
  canEditEvent: boolean;
  updateActiveEvent: (eventId: string) => void;
  handleOnBack: () => void;
}> = ({ events, updateActiveEvent, canEditEvent, handleOnBack }) => {
  const sortedEvents = events.sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime()
  );
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
        {sortedEvents.map((event: EventPlan, i) => {
          const {
            status,
            clientName,
            startDate,
            endDate,
            eventType,
            attendees,
            budget,
            comments,
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
              {comments && (
                <div>
                  <b>Comments:</b> {comments}
                </div>
              )}
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
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <button onClick={handleOnBack}>Back</button>
      </div>
    </div>
  );
};

export default EventDisplay;
