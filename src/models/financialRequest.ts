import { v4 } from "uuid";
import { RequestStatus } from "../types/requestStatus";
class FinancialRequest {
  requestId: string = v4();
  requestingDept: string = "";
  eventId: string = "";
  requiredAmount: number = 1;
  reason: string = "";
  status: RequestStatus = "Pending";

  constructor(
    requestingDept?: string,
    eventId?: string,
    requiredAmount?: number,
    reason?: string,
    status?: RequestStatus
  ) {
    requestingDept && this.setRequestingDept(requestingDept);
    eventId && this.setEventId(eventId);
    requiredAmount && this.setRequiredAmount(requiredAmount);
    reason && this.setReason(reason);
    status && this.setStatus(status);
  }

  setRequestingDept(requestingDept: string) {
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
