import { v4 } from "uuid";
import { EventStatus } from "../types/eventStatus";
class EventPlan {
  eventId: string;
  status: EventStatus;
  clientName: string;
  startDate: Date;
  endDate: Date;
  eventType: string;
  eventDescription: string = "";
  attendees: number;
  budget: number;
  comments: string = "";

  constructor(
    clientName: string,
    status: EventStatus,
    startDate: Date,
    endDate: Date,
    eventType: string,
    attendees: number,
    budget: number
  ) {
    this.eventId = v4();
    this.status = status;
    this.clientName = clientName ? clientName : "Unspecified";
    this.eventType = eventType ? eventType : "Unspecified";
    this.startDate = startDate;
    this.endDate = endDate;
    this.attendees = attendees;
    this.budget = budget;
  }

  setStatus(status: EventStatus) {
    this.status = status;
  }

  setClientName(clientName: string) {
    this.clientName = clientName;
  }

  setEventType(eventType: string) {
    this.eventType = eventType;
  }

  setStartDate(startDate: Date) {
    this.startDate = startDate;
  }

  setEndDate(endDate: Date) {
    this.endDate = endDate;
  }

  setAttendees(attendees: number) {
    this.attendees = attendees;
  }

  setBudget(budget: number) {
    this.budget = budget;
  }

  setComments(comments: string) {
    this.comments = comments;
  }

  convertToJson() {
    return JSON.stringify(this);
  }
}

export default EventPlan;
