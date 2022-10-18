import React, { useEffect, useState } from "react";
import EventPlan from "../models/event";
import RecruitmentRequest from "../models/recruitmentRequest";
import { Department, isOfTypeDepartment } from "../types/departments";
import { isOfTypeRequestStatus, RequestStatus } from "../types/requestStatus";

const RecruitmentRequestEdit: React.FC<{
  isEditing: boolean;
  allEvents: EventPlan[];
  editedRequest: RecruitmentRequest | null;
  canProcessRequest: boolean;
  handleUpdateRecruitmentRequest: (
    requestingDept: Department,
    eventId: string,
    jobTitle: string,
    jobDescript: string,
    status: RequestStatus
  ) => void;
  handleNewRecruitmentRequest: (
    requestingDept: Department,
    eventId: string,
    jobTitle: string,
    jobDescript: string,
    status: RequestStatus
  ) => void;
  handleOnBack: () => void;
}> = ({
  isEditing,
  allEvents,
  editedRequest,
  canProcessRequest,
  handleUpdateRecruitmentRequest,
  handleNewRecruitmentRequest,
  handleOnBack,
}) => {
  const [requestingDept, setRequestingDept] =
    useState<Department>("Administration");
  const [eventId, setEventId] = useState<string>("");
  const [jobTitle, setjobTitle] = useState<string>("");
  const [jobDescript, setjobDescript] = useState<string>("");
  const [status, setStatus] = useState<RequestStatus>("Pending");

  useEffect(() => {
    if (isEditing && editedRequest) {
      setRequestingDept(editedRequest.requestingDept);
      setEventId(editedRequest.eventId);
      setjobTitle(editedRequest.jobTitle);
      setjobDescript(editedRequest.jobDescript);
      setStatus(editedRequest.status);
    }
  }, [editedRequest, isEditing]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEditing) {
      handleUpdateRecruitmentRequest(
        requestingDept,
        eventId,
        jobTitle,
        jobDescript,
        status
      );
    } else {
      // we are creating a new event
      handleNewRecruitmentRequest(
        requestingDept,
        eventId,
        jobTitle,
        jobDescript,
        status
      );
    }
  };

  const onDepartmentChange = (
    departmentChangeEvent: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newDepartment = departmentChangeEvent.target.value;
    if (isOfTypeDepartment(newDepartment)) setRequestingDept(newDepartment);
  };

  return (
    <div style={{ margin: "30px", border: "dashed", padding: "20px" }}>
      <h2 style={{ marginTop: "0" }}>Recruitment request</h2>
      <form
        onSubmit={handleSubmit}
        onReset={handleOnBack}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <div>
          <label>Requesting department</label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "40px 1fr 40px 1fr",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <input
              type="radio"
              value="Administration"
              onChange={onDepartmentChange}
              checked={requestingDept === "Administration"}
              disabled={canProcessRequest}
            />{" "}
            Administration
            <input
              type="radio"
              value="Services"
              onChange={onDepartmentChange}
              checked={requestingDept === "Services"}
              disabled={canProcessRequest}
            />{" "}
            Services
            <input
              type="radio"
              value="Production"
              onChange={onDepartmentChange}
              checked={requestingDept === "Production"}
              disabled={canProcessRequest}
            />{" "}
            Production
            <input
              type="radio"
              value="Financial"
              onChange={onDepartmentChange}
              checked={requestingDept === "Financial"}
              disabled={canProcessRequest}
            />{" "}
            Financial
          </div>
        </div>

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
            disabled={canProcessRequest}
          >
            {allEvents.map((event) => (
              <option value={event.eventId}>{`${
                event.clientName
              } / ${event.eventId.slice(0, 8)}`}</option>
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
          <label>Job Title</label>
          <input
            onChange={(at) => {
              setjobTitle(at.target.value);
            }}
            value={jobTitle}
            disabled={canProcessRequest}
          ></input>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5px",
          }}
        >
          <label>Job Description</label>
          <textarea
            onChange={(fc) => {
              setjobDescript(fc.target.value);
            }}
            value={jobDescript}
            disabled={canProcessRequest}
          ></textarea>
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
              if (isOfTypeRequestStatus(statusChangeEvent.target.value))
                setStatus(statusChangeEvent.target.value);
            }}
            value={status}
            disabled={!canProcessRequest}
          >
            <option value={"Pending"}>Pending</option>
            <option value={"Processed"}>Processed</option>
            <option value={"Rejected"}>Rejected</option>
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
          <input type="submit"></input>
          <input type="reset" value="Back"></input>
        </div>
      </form>
    </div>
  );
};

export default RecruitmentRequestEdit;
