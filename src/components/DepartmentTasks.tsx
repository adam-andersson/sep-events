import React, { useState } from "react";
import Employee from "../models/employee";
import EventPlan from "../models/event";
import { isOfTypePriority, Priority } from "../types/priorities";

const DepartmentTasks: React.FC<{
  isInProductionTeam: boolean;
  allEvents: EventPlan[];
  potentialAssignees: Employee[];
  handleOnBack: () => void;
}> = ({ isInProductionTeam, allEvents, potentialAssignees, handleOnBack }) => {
  const [eventId, setEventId] = useState<string>(allEvents[0].eventId);
  const [description, setDescription] = useState<string>("");
  const [assignee, setAssignee] = useState<string>(potentialAssignees[0].name);
  const [priority, setPriority] = useState<Priority>("Medium");

  const selectedTab = isInProductionTeam ? "Decorations" : "Food Related";
  const availableTabs = isInProductionTeam
    ? [
        "General",
        "Decorations",
        "Photograph",
        "Music",
        "Graphic Design",
        "Computer Related",
      ]
    : ["Food Related", "Table Service"];

  const handleSubmit = () => {
    console.log("Submit");
  };

  return (
    <div style={{ margin: "30px", border: "dashed", padding: "20px" }}>
      <h2 style={{ marginTop: "0" }}>Department Tasks</h2>
      <div style={{ display: "flex", gap: "1px", marginBottom: "10px" }}>
        {availableTabs.map((subteam, i) => (
          <button disabled={subteam !== selectedTab} key={i}>
            {subteam}
          </button>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        onReset={handleOnBack}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3px",
          }}
        >
          <label>Event Reference</label>
          <select
            onChange={(et) => setEventId(et.target.value)}
            value={eventId}
          >
            {allEvents.map((event, i) => (
              <option value={event.eventId} key={i}>{`${
                event.clientName
              } / ${event.eventId.slice(0, 8)}`}</option>
            ))}
          </select>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5px",
          }}
        >
          <label>Description</label>
          <textarea
            onChange={(fc) => {
              setDescription(fc.target.value);
            }}
            value={description}
          ></textarea>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3px",
          }}
        >
          <label>Assignee</label>
          <select
            onChange={(et) => setAssignee(et.target.value)}
            value={assignee}
          >
            {potentialAssignees.map((assignee, i) => (
              <option
                key={i}
                value={assignee.name}
              >{`${assignee.name} / ${assignee.role}`}</option>
            ))}
          </select>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3px",
          }}
        >
          <label>Priority</label>
          <select
            onChange={(et) => {
              const newPriority = et.target.value;
              if (isOfTypePriority(newPriority)) setPriority(newPriority);
            }}
            value={priority}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div
          style={{
            marginTop: "10px",
            display: "flex",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          <input type="submit" value="Send Task"></input>
          <input type="reset" value="Back"></input>
        </div>
      </form>
    </div>
  );
};

export default DepartmentTasks;
