import FinancialRequest from "../models/financialRequest";

describe("Financial Request", () => {
  let testFinRequest: FinancialRequest;

  beforeEach(() => {
    testFinRequest = new FinancialRequest("a", "b", 1, "c", "Pending");
  });

  test("Can set requesting department", () => {
    testFinRequest.setRequestingDept("Production");
    expect(testFinRequest.requestingDept).toEqual("Production");
  });

  test("Can set event id", () => {
    testFinRequest.setEventId("abcdef");
    expect(testFinRequest.eventId).toEqual("abcdef");
  });

  test("Can set request amount", () => {
    testFinRequest.setRequiredAmount(200);
    expect(testFinRequest.requiredAmount).toEqual(200);
  });

  test("Can set request reason", () => {
    testFinRequest.setReason("Buy flowers.");
    expect(testFinRequest.reason).toEqual("Buy flowers.");
  });

  test("Can set request status", () => {
    testFinRequest.setStatus("Rejected");
    expect(testFinRequest.status).toEqual("Rejected");
  });
});
