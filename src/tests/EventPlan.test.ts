import EventPlan from "../models/event";

const TODAYS_DATE = new Date();
const TOMORROW_DATE = new Date(TODAYS_DATE);
TOMORROW_DATE.setDate(TOMORROW_DATE.getDate() + 1);

describe("Event Plan Class", () => {
  let testEvent: EventPlan;

  beforeEach(() => {
    testEvent = new EventPlan(
      "a",
      "Pending",
      TODAYS_DATE,
      TOMORROW_DATE,
      "b",
      1,
      1
    );
  });

  test("Can set event status", () => {
    testEvent.setStatus("Accepted");
    expect(testEvent.status).toEqual("Accepted");
  });

  test("Can set event client name", () => {
    testEvent.setClientName("KTH");
    expect(testEvent.clientName).toEqual("KTH");
  });

  test("Can set event type", () => {
    testEvent.setEventType("Party");
    expect(testEvent.eventType).toEqual("Party");
  });

  test("Can set event startDate", () => {
    const TOMORROW_DATE = new Date();
    TOMORROW_DATE.setDate(TOMORROW_DATE.getDate() + 1);
    testEvent.setStartDate(TOMORROW_DATE);
    expect(testEvent.startDate).toEqual(TOMORROW_DATE);
  });

  test("Can set event endDate", () => {
    const TOMORROW_DATE = new Date();
    TOMORROW_DATE.setDate(TOMORROW_DATE.getDate() + 1);
    testEvent.setEndDate(TOMORROW_DATE);
    expect(testEvent.endDate).toEqual(TOMORROW_DATE);
  });

  test("Can set event attendees", () => {
    testEvent.setAttendees(14);
    expect(testEvent.attendees).toEqual(14);
  });

  test("Can set event budget", () => {
    testEvent.setBudget(2000);
    expect(testEvent.budget).toEqual(2000);
  });

  test("Can set event comments", () => {
    const COMMENT = "This budget looks appropriate.";
    testEvent.setComments(COMMENT);
    expect(testEvent.comments).toEqual(COMMENT);
  });

  test("Attendees must be more than zero", () => {
    const START_ATTENDEES = 10;
    testEvent.setAttendees(START_ATTENDEES);
    expect(testEvent.attendees).toEqual(START_ATTENDEES);
    expect(() => testEvent.setAttendees(-2)).toThrow(
      "There must be at least one attendee."
    );
    expect(testEvent.attendees).toEqual(START_ATTENDEES);
  });

  test("Budget must be more than zero", () => {
    const START_BUDGET = 100;
    testEvent.setBudget(START_BUDGET);
    expect(testEvent.budget).toEqual(START_BUDGET);
    expect(() => testEvent.setBudget(-200)).toThrow(
      "There must be at least some budget allocated to the event."
    );
    expect(testEvent.budget).toEqual(START_BUDGET);
  });

  test("Start date can not be set to a past date", () => {
    const CURRENT_DATE = new Date();

    const YESTERDAY_DATE = new Date(CURRENT_DATE);
    YESTERDAY_DATE.setDate(YESTERDAY_DATE.getDate() - 1);

    const TOMORROW_DATE = new Date(CURRENT_DATE);
    TOMORROW_DATE.setDate(TOMORROW_DATE.getDate() + 1);

    testEvent.setStartDate(TOMORROW_DATE);
    expect(testEvent.startDate).toEqual(TOMORROW_DATE);

    expect(() => testEvent.setStartDate(YESTERDAY_DATE)).toThrow(
      "The start date can not be before todays date."
    );

    expect(testEvent.startDate).toEqual(TOMORROW_DATE);
  });

  test("End date can not be set to before the start date", () => {
    const CURRENT_DATE = new Date();

    const IN_THREE_DAYS_DATE = new Date(CURRENT_DATE);
    IN_THREE_DAYS_DATE.setDate(IN_THREE_DAYS_DATE.getDate() + 3);

    const IN_TWO_DAYS_DATE = new Date(CURRENT_DATE);
    IN_TWO_DAYS_DATE.setDate(IN_TWO_DAYS_DATE.getDate() + 2);

    const IN_ONE_WEEK_DATE = new Date(CURRENT_DATE);
    IN_ONE_WEEK_DATE.setDate(IN_ONE_WEEK_DATE.getDate() + 7);

    testEvent.setStartDate(IN_THREE_DAYS_DATE);
    expect(testEvent.startDate).toEqual(IN_THREE_DAYS_DATE);

    testEvent.setEndDate(IN_ONE_WEEK_DATE);
    expect(testEvent.endDate).toEqual(IN_ONE_WEEK_DATE);

    expect(() => testEvent.setEndDate(IN_TWO_DAYS_DATE)).toThrow(
      "The end date can not be before the start date."
    );

    expect(testEvent.endDate).toEqual(IN_ONE_WEEK_DATE);
  });
});
