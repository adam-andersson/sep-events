import React, { useEffect, useState } from "react";
import DepartmentTask from "../models/departmentTask";
import Employee from "../models/employee";
import EventPlan from "../models/event";
import { isOfTypePriority, Priority } from "../types/priorities";
import { Subteam } from "../types/subteam";

const DepartmentTasks: React.FC<{
  activeDepartmentTask: DepartmentTask | null;
  isInProductionTeam: boolean;
  allEvents: EventPlan[];
  canOnlyAddPlanAndComment: boolean;
  potentialAssignees: Employee[];
  handleUpdateDepartmentTask: (
    subteam: Subteam,
    eventId: string,
    description: string,
    assignee: string,
    priority: Priority,
    plan: string,
    financialComment: string
  ) => void;
  handleNewDepartmentTask: (
    subteam: Subteam,
    eventId: string,
    description: string,
    assignee: string,
    priority: Priority,
    plan: string,
    financialComment: string
  ) => void;
  handleOnBack: () => void;
}> = ({
  activeDepartmentTask,
  isInProductionTeam,
  allEvents,
  canOnlyAddPlanAndComment,
  potentialAssignees,
  handleUpdateDepartmentTask,
  handleNewDepartmentTask,
  handleOnBack,
}) => {
  const [eventId, setEventId] = useState<string>(
    allEvents.length > 0 ? allEvents[0].eventId : ""
  );
  const [description, setDescription] = useState<string>("");
  const [assignee, setAssignee] = useState<string>(
    potentialAssignees.length > 0 ? potentialAssignees[0].name : ""
  );
  const [priority, setPriority] = useState<Priority>("Medium");
  const [plan, setPlan] = useState<string>("");
  const [financialComment, setFinancialComment] = useState<string>("");

  const x = !canOnlyAddPlanAndComment && !financialComment ? "none" : "initial";

  useEffect(() => {
    if (activeDepartmentTask) {
      setEventId(activeDepartmentTask.eventId);
      setDescription(activeDepartmentTask.description);
      setAssignee(activeDepartmentTask.assignee);
      setPriority(activeDepartmentTask.priority);
      setPlan(activeDepartmentTask.plan);
      setFinancialComment(activeDepartmentTask.financialComment);
    }
  }, [activeDepartmentTask]);

  const selectedTab: Subteam = isInProductionTeam
    ? "Decorations"
    : "Food Related";
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (activeDepartmentTask) {
      handleUpdateDepartmentTask(
        selectedTab,
        eventId,
        description,
        assignee,
        priority,
        plan,
        financialComment
      );
    } else {
      handleNewDepartmentTask(
        selectedTab,
        eventId,
        description,
        assignee,
        priority,
        plan,
        financialComment
      );
    }
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
            onChange={(refEvent) => setEventId(refEvent.target.value)}
            value={eventId}
            disabled={canOnlyAddPlanAndComment}
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
            onChange={(descEvent) => {
              setDescription(descEvent.target.value);
            }}
            value={description}
            disabled={canOnlyAddPlanAndComment}
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
            onChange={(assigneeEvent) =>
              setAssignee(assigneeEvent.target.value)
            }
            value={assignee}
            disabled={canOnlyAddPlanAndComment}
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
            onChange={(prioEvent) => {
              const newPriority = prioEvent.target.value;
              if (isOfTypePriority(newPriority)) setPriority(newPriority);
            }}
            value={priority}
            disabled={canOnlyAddPlanAndComment}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div
          style={{
            display: `${
              !canOnlyAddPlanAndComment && !financialComment ? "none" : "grid"
            }`,
            gridTemplateColumns: "1fr 1fr",
            gap: "5px",
          }}
        >
          <label>Plan</label>
          <textarea
            onChange={(planEvent) => {
              setPlan(planEvent.target.value);
            }}
            value={plan}
            disabled={!canOnlyAddPlanAndComment}
          ></textarea>
        </div>

        <div
          style={{
            display: `${
              !canOnlyAddPlanAndComment && !financialComment ? "none" : "grid"
            }`,
            gridTemplateColumns: "1fr 1fr",
            gap: "5px",
          }}
        >
          <label>Financial Comment</label>
          <textarea
            onChange={(fcEvent) => {
              setFinancialComment(fcEvent.target.value);
            }}
            value={financialComment}
            disabled={!canOnlyAddPlanAndComment}
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
          <input type="submit" value="Send Task"></input>
          <input type="reset" value="Back"></input>
        </div>
      </form>
    </div>
  );
};

export default DepartmentTasks;
