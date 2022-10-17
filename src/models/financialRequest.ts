import { v4 } from "uuid";
import { Department, isOfTypeDepartment } from "../types/departments";
import { RequestStatus } from "../types/requestStatus";
class FinancialRequest {
  requestId: string = v4();
  requestingDept: Department = "Administration";
  eventId: string = "Unspecified";
  requiredAmount: number = 1;
  reason: string = "Unspecified";
  status: RequestStatus = "Pending";

  constructor(
    requestingDept?: string,
    eventId?: string,
    requiredAmount?: number,
    reason?: string,
    status?: RequestStatus
  ) {
    requestingDept &&
      isOfTypeDepartment(requestingDept) &&
      this.setRequestingDept(requestingDept);
    eventId && this.setEventId(eventId);
    requiredAmount && this.setRequiredAmount(requiredAmount);
    reason && this.setReason(reason);
    status && this.setStatus(status);
  }

  setRequestingDept(requestingDept: Department) {
    this.requestingDept = requestingDept;
  }

  setEventId(eventId: string) {
    this.eventId = eventId;
  }

  setRequiredAmount(requiredAmount: number) {
    this.requiredAmount = requiredAmount;
  }

  setReason(reason: string) {
    this.reason = reason;
  }

  setStatus(status: RequestStatus) {
    this.status = status;
  }

  convertToJson() {
    return JSON.stringify(this);
  }
}

export default FinancialRequest;
