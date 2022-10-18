import SepRequest from "./sepRequest";
class FinancialRequest extends SepRequest {
  requiredAmount: number = 1;
  reason: string = "Unspecified";

  constructor(
    requestingDept?: string,
    eventId?: string,
    requiredAmount?: number,
    reason?: string,
    status?: string
  ) {
    super(requestingDept, eventId, status);
    requiredAmount && this.setRequiredAmount(requiredAmount);
    reason && this.setReason(reason);
  }

  setRequiredAmount(requiredAmount: number) {
    if (requiredAmount !== this.requiredAmount)
      this.requiredAmount = requiredAmount;
  }

  setReason(reason: string) {
    if (reason !== this.reason) this.reason = reason;
  }
}

export default FinancialRequest;
