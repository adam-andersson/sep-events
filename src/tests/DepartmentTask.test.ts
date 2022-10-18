import DepartmentTask from "../models/departmentTask";

describe("Department Task Class - Setters", () => {
  let testDepartmentTask: DepartmentTask;

  beforeEach(() => {
    testDepartmentTask = new DepartmentTask();
  });

  test("Can set task subteam", () => {
    testDepartmentTask.setSubteam("Food Related");
    expect(testDepartmentTask.subteam).toEqual("Food Related");
  });

  test("Can set event id", () => {
    testDepartmentTask.setEventId("ab-34-cd");
    expect(testDepartmentTask.eventId).toEqual("ab-34-cd");
  });

  test("Can set task description", () => {
    testDepartmentTask.setDescription("Party for lots of people");
    expect(testDepartmentTask.description).toEqual("Party for lots of people");
  });

  test("Can set task assignee", () => {
    testDepartmentTask.setAssignee("angelina");
    expect(testDepartmentTask.assignee).toEqual("angelina");
  });

  test("Can set task priority", () => {
    testDepartmentTask.setPriority("High");
    expect(testDepartmentTask.priority).toEqual("High");
  });

  test("Can set task plan", () => {
    testDepartmentTask.setPlan("1. Buy, 2. Execute");
    expect(testDepartmentTask.plan).toEqual("1. Buy, 2. Execute");
  });

  test("Can set financial comment", () => {
    testDepartmentTask.setFinancialComment("Our budget should be OK for this");
    expect(testDepartmentTask.financialComment).toEqual(
      "Our budget should be OK for this"
    );
  });

  test("Does not change subteam if invalid subteam", () => {
    /** First set it to a valid subteam so we can be sure of the starting state */
    testDepartmentTask.setSubteam("Decorations");
    expect(testDepartmentTask.subteam).toEqual("Decorations");

    testDepartmentTask.setSubteam("InvalidSubteam");
    expect(testDepartmentTask.subteam).toEqual("Decorations");
  });

  test("Does not change priority if invalid priority", () => {
    /** First set it to a valid priority so we can be sure of the starting state */
    testDepartmentTask.setPriority("Medium");
    expect(testDepartmentTask.priority).toEqual("Medium");

    testDepartmentTask.setPriority("SuperHigh");
    expect(testDepartmentTask.priority).toEqual("Medium");
  });
});

describe("Department Task Class - Constructor", () => {
  test("Reverts to default subteam (Decorations) when constructing with invalid subteam", () => {
    const testInvalidSubteam = new DepartmentTask("InvalidSubteam");
    expect(testInvalidSubteam.subteam).toEqual("Decorations");
  });

  test("Reverts to default priority (Medium) when constructing with invalid priority", () => {
    const testInvalidPriority = new DepartmentTask(
      "Decorations",
      "abcdef",
      "desc",
      "assignee",
      "SuperHigh"
    );
    expect(testInvalidPriority.priority).toEqual("Medium");
  });
});
