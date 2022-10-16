import { v4 } from "uuid";
class FinancialRequest {
  requestId: string;
  requestingDept: string;
  eventId: string;
  requiredAmount: number;
  reason: string;
  status: "pending";

  constructor(
    requestingDept: string,
    eventId: string,
    requiredAmount: number,
    reason: string
  ) {
    this.requestId = v4();
    this.requestingDept = requestingDept;
    this.eventId = eventId;
    this.requiredAmount = requiredAmount;
    this.reason = reason;
    this.status = "pending";
  }

  convertToJson() {
    return JSON.stringify(this);
  }
}

export default FinancialRequest;
