import { v4 } from "uuid";
import { Priority } from "../types/priorities";
import { Subteam } from "../types/subteam";

class DepartmentTask {
  taskId: string = v4();
  subteam: Subteam = "Decorations";
  eventId: string = "";
  description: string = "";
  assignee: string = "";
  priority: Priority = "Medium";

  constructor(
    subteam?: Subteam,
    eventId?: string,
    description?: string,
    assignee?: string,
    priority?: Priority
  ) {
    subteam && this.setSubteam(subteam);
    eventId && this.setEventId(eventId);
    description && this.setDescription(description);
    assignee && this.setAssignee(assignee);
    priority && this.setPriority(priority);
  }

  setSubteam(subteam: Subteam) {
    this.subteam = subteam;
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
