import { v4 } from "uuid";
class EventPlan {
  eventId: string;
  status: "pending" | "accepted" | "rejected";
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
    startDate: Date,
    endDate: Date,
    eventType: string,
    attendees: number,
    budget: number
  ) {
    this.eventId = v4();
    this.status = "pending";
    this.clientName = clientName;
    this.eventType = eventType;
    this.startDate = startDate;
    this.endDate = endDate;
    this.attendees = attendees;
    this.budget = budget;
  }

  setStatus(status: "pending" | "accepted" | "rejected") {
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

  addComments(comments: string) {
    this.comments = comments;
  }

  convertToJson() {
    return JSON.stringify(this);
  }
}

export default EventPlan;
