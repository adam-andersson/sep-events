import { v4 } from "uuid";
import { isOfTypePriority, Priority } from "../types/priorities";
import { isOfTypeSubteam, Subteam } from "../types/subteam";

class DepartmentTask {
  taskId: string = v4();
  subteam: Subteam = "Decorations";
  eventId: string = "";
  description: string = "";
  assignee: string = "";
  priority: Priority = "Medium";
  plan: string = "";
  financialComment: string = "";

  constructor(
    subteam?: string,
    eventId?: string,
    description?: string,
    assignee?: string,
    priority?: string,
    plan?: string,
    financialComment?: string
  ) {
    subteam && this.setSubteam(subteam);
    eventId && this.setEventId(eventId);
    description && this.setDescription(description);
    assignee && this.setAssignee(assignee);
    priority && this.setPriority(priority);
    plan && this.setPlan(plan);
    financialComment && this.setFinancialComment(financialComment);
  }

  setSubteam(subteam: string) {
    if (isOfTypeSubteam(subteam)) {
      if (subteam !== this.subteam) this.subteam = subteam;
    }
  }

  setEventId(eventId: string) {
    if (eventId !== this.eventId) this.eventId = eventId;
  }

  setDescription(description: string) {
    if (description !== this.description) this.description = description;
  }

  setAssignee(assignee: string) {
    if (assignee !== this.assignee) this.assignee = assignee;
  }

  setPriority(priority: string) {
    if (isOfTypePriority(priority)) {
      if (priority !== this.priority) this.priority = priority;
    }
  }

  setPlan(plan: string) {
    if (plan !== this.plan) this.plan = plan;
  }

  setFinancialComment(financialComment: string) {
    if (financialComment !== this.financialComment)
      this.financialComment = financialComment;
  }

  convertToJson() {
    return JSON.stringify(this);
  }
}

export default DepartmentTask;
