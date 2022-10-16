import { v4 } from "uuid";
class FinancialRequest {
  requestId;
  requestingDept;
  eventId;
  requiredAmount;
  reason;
  status;

  constructor(requestingDept, eventId, requiredAmount, reason) {
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
