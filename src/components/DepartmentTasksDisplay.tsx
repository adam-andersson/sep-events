import React from "react";
import DepartmentTask from "../models/departmentTask";

import FinancialRequest from "../models/financialRequest";

const DepartmentTasksDisplay: React.FC<{
  departmentTasks: DepartmentTask[];
  updateDepartmentTask: (taskId: string) => void;
  handleOnBack: () => void;
}> = ({ departmentTasks, updateDepartmentTask, handleOnBack }) => {
  return (
    <div style={{ margin: "0 30px 0 30px" }}>
      <h2>List of Department Tasks:</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "30px",
          overflow: "scroll",
        }}
      >
        {departmentTasks.map((dt, i) => {
          const { subteam, eventId, description, assignee, priority } = dt;
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
                <b>Subteam:</b> {subteam}
              </div>
              <div>
                <b>Event Reference:</b> {`${eventId.slice(0, 8)}`}
              </div>
              <div>
                <b>Description:</b> {description}
              </div>
              <div>
                <b>Assignee:</b> {assignee}
              </div>
              <div>
                <b>Priority:</b> {priority}
              </div>
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

export default DepartmentTasksDisplay;
