import { v4 } from "uuid";
import { Department, isOfTypeDepartment } from "../types/departments";
import { isOfTypeRequestStatus, RequestStatus } from "../types/requestStatus";
export default class SepRequest {
  requestId: string = v4();
  requestingDept: Department = "Administration";
  eventId: string = "Unspecified";
  status: RequestStatus = "Pending";

  constructor(requestingDept?: string, eventId?: string, status?: string) {
    requestingDept && this.setRequestingDept(requestingDept);
    eventId && this.setEventId(eventId);
    status && this.setStatus(status);
  }

  setRequestingDept(requestingDept: string) {
    if (isOfTypeDepartment(requestingDept)) {
      if (requestingDept !== this.requestingDept)
        this.requestingDept = requestingDept;
    }
  }

  setEventId(eventId: string) {
    if (eventId !== this.eventId) this.eventId = eventId;
  }

  setStatus(status: string) {
    if (isOfTypeRequestStatus(status)) {
      if (status !== this.status) this.status = status;
    }
  }
  public convertToJson() {
    return JSON.stringify(this);
  }
}
