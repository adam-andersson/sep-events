import RecruitmentRequest from "../models/recruitmentRequest";

describe("Recruitment Request Class - Setters", () => {
  let testRecRequest: RecruitmentRequest;

  beforeEach(() => {
    testRecRequest = new RecruitmentRequest(
      "Production",
      "abcdef",
      "Project Manager",
      "Manage an event project.",
      "Pending"
    );
  });

  /** This setter is inherited from parent class */
  test("Can set requesting department", () => {
    testRecRequest.setRequestingDept("Production");
    expect(testRecRequest.requestingDept).toEqual("Production");
  });

  /** This setter is inherited from parent class */
  test("Can set event id", () => {
    testRecRequest.setEventId("ab-34-cd");
    expect(testRecRequest.eventId).toEqual("ab-34-cd");
  });

  /** This setter is inherited from parent class */
  test("Can set request status", () => {
    testRecRequest.setStatus("Rejected");
    expect(testRecRequest.status).toEqual("Rejected");
  });

  test("Can set job title", () => {
    testRecRequest.setJobTitle("Clown");
    expect(testRecRequest.jobTitle).toEqual("Clown");
  });

  test("Can set job description", () => {
    testRecRequest.setJobDescript("Be a clown at an event for kids.");
    expect(testRecRequest.jobDescript).toEqual(
      "Be a clown at an event for kids."
    );
  });

  test("Does not change request status if invalid status", () => {
    /** First set it to a valid status so we can be sure of the starting state */
    testRecRequest.setStatus("Pending");
    expect(testRecRequest.status).toEqual("Pending");

    testRecRequest.setStatus("InvalidStatus");
    expect(testRecRequest.status).toEqual("Pending");
  });

  test("Does not change requesting department if invalid department", () => {
    /** First set it to a valid department so we can be sure of the starting state */
    testRecRequest.setRequestingDept("Production");
    expect(testRecRequest.requestingDept).toEqual("Production");

    testRecRequest.setRequestingDept("InvalidDepartment");
    expect(testRecRequest.requestingDept).toEqual("Production");
  });
});

describe("Recruitment Request Class - Constructor", () => {
  test("Reverts to default department when constructing with invalid department", () => {
    const testInvalidStatus = new RecruitmentRequest(
      "ClownDepartment",
      "abcdef",
      "Project Manager",
      "Manage an event project.",
      "Pending"
    );
    expect(testInvalidStatus.requestingDept).toEqual("Administration");
  });

  test("Reverts to default status when constructing with invalid status", () => {
    const testInvalidStatus = new RecruitmentRequest(
      "Production",
      "abcdef",
      "Project Manager",
      "Manage an event project.",
      "InvalidStatus"
    );
    expect(testInvalidStatus.status).toEqual("Pending");
  });
});
