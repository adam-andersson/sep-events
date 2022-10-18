import { v4 } from "uuid";
import { EventStatus, isOfTypeEventStatus } from "../types/eventStatus";
class EventPlan {
  eventId: string = v4();
  status: EventStatus = "Pending";
  clientName: string = "";
  startDate: Date = new Date("2020-01-01");
  endDate: Date = new Date("2025-01-01");
  eventType: string = "Unspecified";
  eventDescription: string = "";
  attendees: number = 1;
  budget: number = 1;
  comments: string = "";

  constructor(
    clientName?: string,
    status?: string,
    startDate?: Date,
    endDate?: Date,
    eventType?: string,
    attendees?: number,
    budget?: number,
    comments?: string,
    eventId?: string
  ) {
    this.eventId = v4();
    status && this.setStatus(status);
    clientName && this.setClientName(clientName);
    eventType && this.setEventType(eventType);
    startDate && this.setStartDate(startDate);
    endDate && this.setEndDate(endDate);
    attendees && this.setAttendees(attendees);
    budget && this.setBudget(budget);
    comments && this.setComments(comments);
    eventId && this.setEventId(eventId);
  }

  setEventId(eventId: string) {
    if (eventId !== this.eventId) this.eventId = eventId;
  }

  setStatus(status: string) {
    if (status !== this.clientName) {
      this.status = isOfTypeEventStatus(status) ? status : "Pending";
    }
  }

  setClientName(clientName: string) {
    if (clientName !== this.clientName) {
      this.clientName = clientName;
    }
  }

  setEventType(eventType: string) {
    if (eventType !== this.eventType) this.eventType = eventType;
  }

  setStartDate(startDate: Date) {
    const TODAYS_DATE = new Date();
    TODAYS_DATE.setHours(0, 0, 0, 0);
    if (startDate.getTime() < TODAYS_DATE.getTime())
      throw new Error("The start date can not be before todays date.");

    if (startDate !== this.startDate) this.startDate = startDate;
  }

  setEndDate(endDate: Date) {
    if (endDate.getTime() < this.startDate.getTime())
      throw new Error("The end date can not be before the start date.");
    if (endDate !== this.endDate) this.endDate = endDate;
  }

  setAttendees(attendees: number) {
    if (attendees < 1) throw new Error("There must be at least one attendee.");
    if (attendees !== this.attendees) this.attendees = attendees;
  }

  setBudget(budget: number) {
    if (budget < 1)
      throw new Error(
        "There must be at least some budget allocated to the event."
      );
    if (budget !== this.budget) this.budget = budget;
  }

  setComments(comments: string) {
    if (comments !== this.comments) this.comments = comments;
  }

  convertToJson() {
    return JSON.stringify(this);
  }
}

export default EventPlan;
