import React, { useEffect, useState } from "react";
import EventPlan from "../models/event";
import FinancialRequest from "../models/financialRequest";
import { Department, isOfTypeDepartment } from "../types/departments";
import { isOfTypeRequestStatus, RequestStatus } from "../types/requestStatus";

const FinancialRequestEdit: React.FC<{
  isEditing: boolean;
  allEvents: EventPlan[];
  editedRequest: FinancialRequest | null;
  canProcessRequest: boolean;
  handleUpdateFinancialRequest: (
    requestingDept: Department,
    eventId: string,
    requiredAmount: number,
    reason: string,
    status: RequestStatus
  ) => void;
  handleNewFinancialRequest: (
    requestingDept: Department,
    eventId: string,
    requiredAmount: number,
    reason: string,
    status: RequestStatus
  ) => void;
  handleOnBack: () => void;
}> = ({
  isEditing,
  allEvents,
  editedRequest,
  canProcessRequest,
  handleUpdateFinancialRequest,
  handleNewFinancialRequest,
  handleOnBack,
}) => {
  const [requestingDept, setRequestingDept] =
    useState<Department>("Administration");
  const [eventId, setEventId] = useState<string>("");
  const [requiredAmount, setRequiredAmount] = useState<number>(1);
  const [reason, setReason] = useState<string>("");
  const [status, setStatus] = useState<RequestStatus>("Pending");

  useEffect(() => {
    if (isEditing && editedRequest) {
      setRequestingDept(editedRequest.requestingDept);
      setEventId(editedRequest.eventId);
      setRequiredAmount(editedRequest.requiredAmount);
      setReason(editedRequest.reason);
      setStatus(editedRequest.status);
    }
  }, [editedRequest, isEditing]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEditing) {
      handleUpdateFinancialRequest(
        requestingDept,
        eventId,
        requiredAmount,
        reason,
        status
      );
    } else {
      // we are creating a new event
      handleNewFinancialRequest(
        requestingDept,
        eventId,
        requiredAmount,
        reason,
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
      <h2 style={{ marginTop: "0" }}>Financial Request</h2>
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
            gap: "3px",
          }}
        >
          <label>Required Amount</label>
          <input
            type="number"
            onChange={(at) => {
              const newAmount = parseInt(at.target.value, 10);
              setRequiredAmount(newAmount);
            }}
            value={`${requiredAmount}`}
            min="1"
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
          <label>Reason</label>
          <textarea
            onChange={(fc) => {
              setReason(fc.target.value);
            }}
            value={reason}
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

export default FinancialRequestEdit;
