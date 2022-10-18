import SepRequest from "../models/sepRequest";

describe("Parent Request Class - Setters", () => {
  let testSepReq: SepRequest;

  beforeEach(() => {
    testSepReq = new SepRequest("Financial", "abcdef", "Pending");
  });

  test("Can set requesting department", () => {
    testSepReq.setRequestingDept("Production");
    expect(testSepReq.requestingDept).toEqual("Production");
  });

  test("Can set event id", () => {
    testSepReq.setEventId("123456789");
    expect(testSepReq.eventId).toEqual("123456789");
  });

  test("Can set request status", () => {
    testSepReq.setStatus("Rejected");
    expect(testSepReq.status).toEqual("Rejected");
  });

  test("Does not change request status if invalid status", () => {
    /** First set it to a valid status so we can be sure of the starting state */
    testSepReq.setStatus("Pending");
    expect(testSepReq.status).toEqual("Pending");

    testSepReq.setStatus("InvalidStatus");
    expect(testSepReq.status).toEqual("Pending");
  });

  test("Does not change requesting department if invalid department", () => {
    /** First set it to a valid department so we can be sure of the starting state */
    testSepReq.setRequestingDept("Production");
    expect(testSepReq.requestingDept).toEqual("Production");

    testSepReq.setRequestingDept("InvalidDepartment");
    expect(testSepReq.requestingDept).toEqual("Production");
  });
});

describe("Reverts to default value when constructing instance with illegal parameters", () => {
  test("Reverts to default department when constructing with invalid department", () => {
    const testInvalidDepartmentRequest = new SepRequest(
      "InvalidDepartment",
      "abcdef",
      "Pending"
    );
    expect(testInvalidDepartmentRequest.requestingDept).toEqual(
      "Administration"
    );
  });
  test("Reverts to default status when constructing with invalid status", () => {
    const testInvalidDepartmentRequest = new SepRequest(
      "Financial",
      "abcdef",
      "InvalidStatus"
    );
    expect(testInvalidDepartmentRequest.status).toEqual("Pending");
  });
});
