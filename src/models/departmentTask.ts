import { Priority } from "../types/priorities";

class DepartmentTask {
  eventId: string = "";
  description: string = "";
  assignee: string = "";
  priority: Priority = "Medium";

  constructor(
    eventId?: string,
    description?: string,
    assignee?: string,
    priority?: Priority
  ) {
    eventId && this.setEventId(eventId);
    description && this.setDescription(description);
    assignee && this.setAssignee(assignee);
    priority && this.setPriority(priority);
  }

  setEventId(eventId: string) {
    this.eventId = eventId;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setAssignee(assignee: string) {
    this.assignee = assignee;
  }

  setPriority(priority: Priority) {
    this.priority = priority;
  }

  convertToJson() {
    return JSON.stringify(this);
  }
}

export default DepartmentTask;
