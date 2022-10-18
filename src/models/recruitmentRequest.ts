import SepRequest from "./sepRequest";
class RecruitmentRequest extends SepRequest {
  jobTitle: string = "Unspecified";
  jobDescript: string = "Unspecified";

  constructor(
    requestingDept?: string,
    eventId?: string,
    jobTitle?: string,
    jobDescript?: string,
    status?: string
  ) {
    super(requestingDept, eventId, status);
    jobTitle && this.setJobTitle(jobTitle);
    jobDescript && this.setJobDescript(jobDescript);
  }

  setJobTitle(jobTitle: string) {
    if (jobTitle !== this.jobTitle) this.jobTitle = jobTitle;
  }

  setJobDescript(jobDescript: string) {
    if (jobDescript !== this.jobDescript) this.jobDescript = jobDescript;
  }
}

export default RecruitmentRequest;
