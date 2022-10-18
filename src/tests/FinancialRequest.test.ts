import FinancialRequest from "../models/financialRequest";

describe("Financial Request Class - Setters", () => {
  let testFinRequest: FinancialRequest;

  beforeEach(() => {
    testFinRequest = new FinancialRequest(
      "Administration",
      "abcdef",
      1,
      "random reason",
      "Pending"
    );
  });

  /** This setter is inherited from parent class */
  test("Can set requesting department", () => {
    testFinRequest.setRequestingDept("Production");
    expect(testFinRequest.requestingDept).toEqual("Production");
  });

  /** This setter is inherited from parent class */
  test("Can set event id", () => {
    testFinRequest.setEventId("ab-34-cd");
    expect(testFinRequest.eventId).toEqual("ab-34-cd");
  });

  /** This setter is inherited from parent class */
  test("Can set request status", () => {
    testFinRequest.setStatus("Rejected");
    expect(testFinRequest.status).toEqual("Rejected");
  });

  test("Can set request amount", () => {
    testFinRequest.setRequiredAmount(200);
    expect(testFinRequest.requiredAmount).toEqual(200);
  });

  test("Can set request reason", () => {
    testFinRequest.setReason("Buy flowers.");
    expect(testFinRequest.reason).toEqual("Buy flowers.");
  });

  test("Does not change request status if invalid status", () => {
    /** First set it to a valid status so we can be sure of the starting state */
    testFinRequest.setStatus("Pending");
    expect(testFinRequest.status).toEqual("Pending");

    testFinRequest.setStatus("InvalidStatus");
    expect(testFinRequest.status).toEqual("Pending");
  });

  test("Does not change requesting department if invalid department", () => {
    /** First set it to a valid department so we can be sure of the starting state */
    testFinRequest.setRequestingDept("Production");
    expect(testFinRequest.requestingDept).toEqual("Production");

    testFinRequest.setRequestingDept("InvalidDepartment");
    expect(testFinRequest.requestingDept).toEqual("Production");
  });

  test("Does throw if requested amount is not at least 1 monetary unit", () => {
    /** First set it to a valid amount so we can be sure of the starting state */
    testFinRequest.setRequiredAmount(2000);
    expect(testFinRequest.requiredAmount).toEqual(2000);

    expect(() => testFinRequest.setRequiredAmount(-200)).toThrow(
      "The request needs to be of at least 1 monetary unit."
    );

    /** And validate that the state did not change after throwing. */
    expect(testFinRequest.requiredAmount).toEqual(2000);
  });
});

describe("Financial Request Class - Constructor", () => {
  test("Reverts to default department when constructing with invalid department", () => {
    const testInvalidDepartmentRequest = new FinancialRequest(
      "InvalidDepartment",
      "abcdef",
      1,
      "random reason",
      "Pending"
    );
    expect(testInvalidDepartmentRequest.requestingDept).toEqual(
      "Administration"
    );
  });

  test("Reverts to default status when constructing with invalid status", () => {
    const testInvalidStatus = new FinancialRequest(
      "Production",
      "abcdef",
      1,
      "random reason",
      "InvalidStatus"
    );
    expect(testInvalidStatus.status).toEqual("Pending");
  });

  test("Does throw if requested amount is negative when constructing", () => {
    expect(
      () =>
        new FinancialRequest(
          "Production",
          "abcdef",
          -1337,
          "random reason",
          "Pending"
        )
    ).toThrow("The request needs to be of at least 1 monetary unit.");
  });
});
