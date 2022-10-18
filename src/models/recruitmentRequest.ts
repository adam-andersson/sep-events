import { v4 } from "uuid";
import { Department, isOfTypeDepartment } from "../types/departments";
import { RequestStatus } from "../types/requestStatus";
class RecruitmentRequest {
  requestId: string = v4();
  requestingDept: Department = "Administration";
  eventId: string = "Unspecified";
  jobTitle: string = "Unspecified";
  jobDescript: string = "Unspecified";
  status: RequestStatus = "Pending";

  constructor(
    requestingDept?: string,
    eventId?: string,
    jobTitle?: string,
    jobDescript?: string,
    status?: RequestStatus
  ) {
    requestingDept &&
      isOfTypeDepartment(requestingDept) &&
      this.setRequestingDept(requestingDept);
    eventId && this.setEventId(eventId);
    jobTitle && this.setJobTitle(jobTitle);
    jobDescript && this.setJobDescript(jobDescript);
    status && this.setStatus(status);
  }

  setRequestingDept(requestingDept: Department) {
    this.requestingDept = requestingDept;
  }

  setEventId(eventId: string) {
    this.eventId = eventId;
  }

  setJobTitle(jobTitle: string) {
    this.jobTitle = jobTitle;
  }

  setJobDescript(jobDescript: string) {
    this.jobDescript = jobDescript;
  }

  setStatus(status: RequestStatus) {
    this.status = status;
  }

  convertToJson() {
    return JSON.stringify(this);
  }
}

export default RecruitmentRequest;
