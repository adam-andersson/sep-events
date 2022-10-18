/** Import classes */
import Employee from "../models/employee";
import EventPlan from "../models/event";
import FinancialRequest from "../models/financialRequest";
import RecruitmentRequest from "../models/recruitmentRequest";
import DepartmentTask from "../models/departmentTask";
/** Import json (database) files */
import jsonEmployees from "../database/employees.json";
import jsonEventPlans from "../database/events.json";
import jsonFinancialRequests from "../database/financial_requests.json";
import jsonRecruitmentRequests from "../database/recruitment_requests.json";
import jsonDepartmentTasks from "../database/department_tasks.json";

const loadDatabases = (
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>,
  setAllEvents: React.Dispatch<React.SetStateAction<EventPlan[]>>,
  setAllFinancialRequests: React.Dispatch<
    React.SetStateAction<FinancialRequest[]>
  >,
  setAllRecruitmentRequests: React.Dispatch<
    React.SetStateAction<RecruitmentRequest[]>
  >,
  setAllDepartmentTasks: React.Dispatch<React.SetStateAction<DepartmentTask[]>>
) => {
  /** Read Employees from 'database' and create class instances from them */
  const allEmployees: Employee[] = [];
  jsonEmployees.forEach((employee) => {
    allEmployees.push(
      new Employee(
        employee.name.toLowerCase(),
        employee.email,
        employee.password,
        employee.role
      )
    );
  });
  setEmployees(allEmployees);

  /** Read Events from 'database' and create class instances from them */

  const events: EventPlan[] = [];
  jsonEventPlans.forEach((event) => {
    /** Some date conversion to keep this application away from throwing errors when the database dates gets earlier than todays date */
    const parsedStartDate = new Date(event.startDate);
    const parsedEndDate = new Date(event.endDate);
    const currentDate = new Date();
    if (parsedStartDate.getTime() <= currentDate.getTime()) {
      parsedStartDate.setMonth(currentDate.getMonth() + 1);
    }

    if (parsedEndDate.getTime() <= parsedStartDate.getTime()) {
      parsedEndDate.setMonth(parsedStartDate.getMonth());
      parsedEndDate.setDate(parsedStartDate.getDate());
    }

    events.push(
      new EventPlan(
        event.clientName,
        event.status,
        parsedStartDate,
        parsedEndDate,
        event.eventType,
        event.attendees,
        event.budget,
        event.comments,
        event.eventId
      )
    );
  });
  setAllEvents(events);
  /** Read Financial Requests from 'database' and create class instances from them */

  const finReqs: FinancialRequest[] = [];
  jsonFinancialRequests.forEach((fr) => {
    finReqs.push(
      new FinancialRequest(
        fr.requestingDept,
        fr.eventId,
        fr.requiredAmount,
        fr.reason,
        fr.status
      )
    );
  });
  setAllFinancialRequests(finReqs);

  /** Read Recruitment Requests from 'database' and create class instances from them */

  const recReqs: RecruitmentRequest[] = [];
  jsonRecruitmentRequests.forEach((rr) => {
    recReqs.push(
      new RecruitmentRequest(
        rr.requestingDept,
        rr.eventId,
        rr.jobTitle,
        rr.jobDescript,
        rr.status
      )
    );
  });
  setAllRecruitmentRequests(recReqs);

  /** Read department tasks from 'database' and create class instances from them */

  const depTasks: DepartmentTask[] = [];
  jsonDepartmentTasks.forEach((dt) => {
    const {
      subteam,
      assignee,
      description,
      eventId,
      financialComment,
      plan,
      priority,
    } = dt;

    depTasks.push(
      new DepartmentTask(
        subteam,
        eventId,
        description,
        assignee,
        priority,
        plan,
        financialComment
      )
    );
  });
  setAllDepartmentTasks(depTasks);
};

export default loadDatabases;
