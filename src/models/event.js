import { v4 } from "uuid";
class EventPlan {
  eventId;
  status;
  clientName;
  startDate;
  endDate;
  eventType;
  eventDescription;
  attendees;
  budget;

  constructor(clientName, startDate, endDate, eventType, attendees, budget) {
    this.eventId = v4();
    this.status = "pending";
    this.clientName = clientName;
    this.eventType = eventType;
    this.startDate = startDate;
    this.endDate = endDate;
    this.attendees = attendees;
    this.budget = budget;
  }

  convertToJson() {
    return JSON.stringify(this);
  }
}

export default EventPlan;
