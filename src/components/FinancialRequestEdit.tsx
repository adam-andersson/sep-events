import React, { useEffect, useState } from "react";
import FinancialRequest from "../models/financialRequest";
import { Department, isOfTypeDepartment } from "../types/departments";
import { isOfTypeRequestStatus, RequestStatus } from "../types/requestStatus";

const FinancialRequestEdit: React.FC<{
  isEditing: boolean;
  editedRequest: FinancialRequest;
  handleUpdateFinancialRequest: (
    requestingDept: Department | "",
    eventId: string,
    requiredAmount: number,
    reason: string,
    status: RequestStatus
  ) => void;
  handleNewFinancialRequest: (
    requestingDept: Department | "",
    eventId: string,
    requiredAmount: number,
    reason: string,
    status: RequestStatus
  ) => void;
  handleOnBack: () => void;
}> = ({
  isEditing,
  editedRequest,
  handleUpdateFinancialRequest,
  handleNewFinancialRequest,
  handleOnBack,
}) => {
  const [requestingDept, setRequestingDept] = useState<Department | "">("");
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
            />{" "}
            Administration
            <input
              type="radio"
              value="Services"
              onChange={onDepartmentChange}
              checked={requestingDept === "Services"}
            />{" "}
            Services
            <input
              type="radio"
              value="Production"
              onChange={onDepartmentChange}
              checked={requestingDept === "Production"}
            />{" "}
            Production
            <input
              type="radio"
              value="Financial"
              onChange={onDepartmentChange}
              checked={requestingDept === "Financial"}
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
          <input
            type="text"
            onChange={(et) => setEventId(et.target.value)}
            value={eventId}
          ></input>
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
