import React from "react";
import Employee from "../models/employee";
import { WebsitePage } from "../types/websitePages";

const Dashboard: React.FC<{
  currentUser: Employee;
  setCurrentPage: React.Dispatch<React.SetStateAction<WebsitePage>>;
}> = ({ currentUser, setCurrentPage }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        border: "dashed",
        padding: "20px",
      }}
    >
      <h2 style={{ marginTop: "0" }}>Your dashboard</h2>
      {currentUser.canCreateEvent() && (
        <button onClick={() => setCurrentPage("EventEdit")}>
          Create new event
        </button>
      )}
      {currentUser.canViewEvent() && (
        <button onClick={() => setCurrentPage("EventDisplay")}>
          View events
        </button>
      )}
      {currentUser.canCreateFinancialRequest() && (
        <button onClick={() => setCurrentPage("FinancialRequestEdit")}>
          Create financial request
        </button>
      )}
      {currentUser.canViewFinancialRequest() && (
        <button onClick={() => setCurrentPage("FinancialRequestDisplay")}>
          View financial requests
        </button>
      )}
      {currentUser.canCreateRecruitmentRequest() && (
        <button onClick={() => setCurrentPage("RecruitmentRequestEdit")}>
          Create recruitment request
        </button>
      )}
      {currentUser.canViewRecruitmentRequest() && (
        <button onClick={() => setCurrentPage("RecruitmentRequestDisplay")}>
          View recruitment requests
        </button>
      )}
      {currentUser.canCreateDepartmentTasks() && (
        <button onClick={() => setCurrentPage("DepartmentTaskEdit")}>
          Create department tasks
        </button>
      )}
      {currentUser.canCreateDepartmentTasks() && (
        <button onClick={() => setCurrentPage("DepartmentTaskDisplay")}>
          View department tasks
        </button>
      )}
      {currentUser.isInSubteamAndNotManager() && (
        <button onClick={() => setCurrentPage("UserTasksDisplay")}>
          View my tasks
        </button>
      )}
    </div>
  );
};

export default Dashboard;
