import Employee from "./models/employee";
import Login from "./components/Login";
import jsonEmployees from "./database/employees.json";
import jsonEventPlans from "./database/events.json";
import jsonFinancialRequests from "./database/financial_requests.json";
import jsonRecruitmentRequests from "./database/recruitment_requests.json";
import jsonDepartmentTasks from "./database/department_tasks.json";
import React, { useState } from "react";
import EventPlanning from "./components/EventPlanning";
import EventPlan from "./models/event";
import EventDisplay from "./components/EventDisplay";
import { EmployeeRole, isOfTypeEmployeeRole } from "./types/employeeRole";
import { EventStatus, isOfTypeEventStatus } from "./types/eventStatus";
import { WebsitePage } from "./types/websitePages";
import FinancialRequestEdit from "./components/FinancialRequestEdit";
import FinancialRequest from "./models/financialRequest";
import { Department } from "./types/departments";
import { isOfTypeRequestStatus, RequestStatus } from "./types/requestStatus";
import FinancialRequestDisplay from "./components/FinancialRequestDisplay";
import DepartmentTasks from "./components/DepartmentTasks";
import { isOfTypePriority, Priority } from "./types/priorities";
import DepartmentTask from "./models/departmentTask";
import DepartmentTasksDisplay from "./components/DepartmentTasksDisplay";
import {
  isOfTypeProductionSubteam,
  isOfTypeServiceSubteam,
  isOfTypeSubteam,
  Subteam,
} from "./types/subteam";
import RecruitmentRequest from "./models/recruitmentRequest";
import RecruitmentRequestEdit from "./components/RecruitmentRequestEdit";
import RecruitmentRequestDisplay from "./components/RecruitmentRequestDisplay";

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentUser, setCurrentUser] = useState<Employee | null>(null);

  const [currentPage, setCurrentPage] = useState<WebsitePage>("Login");

  const [allEvents, setAllEvents] = useState<EventPlan[]>([]);
  const [activeEvent, setActiveEvent] = useState<EventPlan | null>(null);

  const [allFinancialRequests, setAllFinancialRequests] = useState<
    FinancialRequest[]
  >([]);
  const [activeFinancialRequest, setActiveFinancialRequest] =
    useState<FinancialRequest | null>(null);

  const [allRecruitmentRequests, setAllRecruitmentRequests] = useState<
    RecruitmentRequest[]
  >([]);
  const [activeRecruitmentRequest, setActiveRecruitmentRequest] =
    useState<RecruitmentRequest | null>(null);

  const [allDepartmentTasks, setAllDepartmentTasks] = useState<
    DepartmentTask[]
  >([]);
  const [activeDepartmentTasks, setActiveDepartmentTasks] =
    useState<DepartmentTask | null>(null);

  /** Handle login success */
  const handleGoodUser = (user: Employee) => {
    setCurrentUser(user);
    setCurrentPage("Homepage");
  };

  /** Handle login failure */
  const handleBadUser = () => {
    setCurrentUser(null);
  };

  /** Reset all active states and redirect to homepage when user clicks back button */
  const handleOnBack = () => {
    setActiveEvent(null);
    setActiveFinancialRequest(null);
    setActiveDepartmentTasks(null);
    setCurrentPage("Homepage");
  };

  /** Change the event that is currently being edited */
  const updateActiveEvent = (eventId: string) => {
    const selectedEvent = allEvents.find((event) => event.eventId === eventId);
    if (selectedEvent) {
      setCurrentPage("EventEdit");
      setActiveEvent(selectedEvent);
    }
  };

  /** Change the financial request that is currently being edited */
  const updateActiveFinancialRequest = (requestId: string) => {
    const selectedFinancialRequest = allFinancialRequests.find(
      (fr) => fr.requestId === requestId
    );
    if (selectedFinancialRequest) {
      setCurrentPage("FinancialRequestEdit");
      setActiveFinancialRequest(selectedFinancialRequest);
    }
  };

  /** Change the recruitment request that is currently being edited */
  const updateActiveRecruitmentRequest = (requestId: string) => {
    const selectedRecruitmentRequest = allRecruitmentRequests.find(
      (fr) => fr.requestId === requestId
    );

    if (selectedRecruitmentRequest) {
      setCurrentPage("RecruitmentRequestEdit");
      setActiveRecruitmentRequest(selectedRecruitmentRequest);
    }
  };

  /** Change the department task that is currently being edited */
  const updateActiveDepartmentTask = (taskId: string) => {
    const selectedDepartmentTask = allDepartmentTasks.find(
      (dt) => dt.taskId === taskId
    );
    if (selectedDepartmentTask) {
      setCurrentPage("DepartmentTaskEdit");
      setActiveDepartmentTasks(selectedDepartmentTask);
    }
  };

  /** Handle the logic and call the constructor and update local state when a new event is created */
  const handleNewEvent = (
    clientName: string,
    status: EventStatus,
    eventType: string,
    startDate: Date,
    endDate: Date,
    attendees: number,
    budget: number
  ) => {
    const newEvent = new EventPlan(
      clientName,
      status,
      startDate,
      endDate,
      eventType,
      attendees,
      budget
    );
    setAllEvents([...allEvents, newEvent]);
    setCurrentPage("EventDisplay");
  };

  /** Handle the logic for calling methods to update the event currently being edited */
  const handleUpdateEvent = (
    clientName: string,
    status: EventStatus,
    eventType: string,
    startDate: Date,
    endDate: Date,
    attendees: number,
    budget: number,
    financialComment: string
  ) => {
    if (!activeEvent) return;
    if (activeEvent.clientName !== clientName)
      activeEvent.setClientName(clientName);
    if (activeEvent.status !== status) activeEvent.setStatus(status);
    if (activeEvent.eventType !== eventType)
      activeEvent.setEventType(eventType);
    if (activeEvent.startDate !== startDate)
      activeEvent.setStartDate(startDate);
    if (activeEvent.endDate !== endDate) activeEvent.setEndDate(endDate);
    if (activeEvent.attendees !== attendees)
      activeEvent.setAttendees(attendees);
    if (activeEvent.budget !== budget) activeEvent.setBudget(budget);
    if (activeEvent.comments !== financialComment)
      activeEvent.setComments(financialComment);

    setActiveEvent(null);
    setCurrentPage("EventDisplay");
  };

  /** Handle the logic and call the constructor and update local state when a new financial request is created */
  const handleNewFinancialRequest = (
    requestingDept: Department | "",
    eventId: string,
    requiredAmount: number,
    reason: string,
    status: RequestStatus
  ) => {
    const newFinancialRequest = new FinancialRequest(
      requestingDept,
      eventId,
      requiredAmount,
      reason,
      status
    );

    setAllFinancialRequests([...allFinancialRequests, newFinancialRequest]);
    setActiveFinancialRequest(null);
    setCurrentPage("FinancialRequestDisplay");
  };

  /** Handle the logic for calling methods to update the financial request currently being edited */
  const handleUpdateFinancialRequest = (
    requestingDept: Department | "",
    eventId: string,
    requiredAmount: number,
    reason: string,
    status: RequestStatus
  ) => {
    if (!activeFinancialRequest) return;
    requestingDept && activeFinancialRequest.setRequestingDept(requestingDept);
    eventId && activeFinancialRequest.setEventId(eventId);
    requiredAmount && activeFinancialRequest.setRequiredAmount(requiredAmount);
    reason && activeFinancialRequest.setReason(reason);
    status && activeFinancialRequest.setStatus(status);

    setActiveFinancialRequest(null);
    setCurrentPage("FinancialRequestDisplay");
  };

  /** Handle the logic and call the constructor and update local state when a new recruitment request is created */
  const handleNewRecruitmentRequest = (
    requestingDept: Department | "",
    eventId: string,
    jobTitle: string,
    jobDescript: string,
    status: RequestStatus
  ) => {
    const newRecruitmentRequest = new RecruitmentRequest(
      requestingDept,
      eventId,
      jobTitle,
      jobDescript,
      status
    );

    setAllRecruitmentRequests([
      ...allRecruitmentRequests,
      newRecruitmentRequest,
    ]);
    setActiveRecruitmentRequest(null);
    setCurrentPage("RecruitmentRequestDisplay");
  };

  /** Handle the logic for calling methods to update the recruitment request currently being edited */
  const handleUpdateRecruitmentRequest = (
    requestingDept: Department | "",
    eventId: string,
    jobTitle: string,
    jobDescript: string,
    status: RequestStatus
  ) => {
    if (!activeRecruitmentRequest) return;
    requestingDept &&
      activeRecruitmentRequest.setRequestingDept(requestingDept);
    eventId && activeRecruitmentRequest.setEventId(eventId);
    jobTitle && activeRecruitmentRequest.setJobTitle(jobTitle);
    jobDescript && activeRecruitmentRequest.setJobDescript(jobDescript);
    status && activeRecruitmentRequest.setStatus(status);

    setActiveRecruitmentRequest(null);
    setCurrentPage("RecruitmentRequestDisplay");
  };

  /** Handle the logic and call the constructor and update local state when a new department task is created */
  const handleNewDepartmentTask = (
    subteam: Subteam,
    eventId: string,
    description: string,
    assignee: string,
    priority: Priority,
    plan: string,
    financialComment: string
  ) => {
    const newDepartmentTask = new DepartmentTask(
      subteam,
      eventId,
      description,
      assignee,
      priority,
      plan,
      financialComment
    );

    setAllDepartmentTasks([...allDepartmentTasks, newDepartmentTask]);
    setActiveDepartmentTasks(null);
    setCurrentPage("DepartmentTaskDisplay");
  };

  /** Handle the logic for calling methods to update the department task currently being edited */
  const handleUpdateDepartmentTask = (
    subteam: Subteam,
    eventId: string,
    description: string,
    assignee: string,
    priority: Priority,
    plan: string,
    financialComment: string
  ) => {
    if (!activeDepartmentTasks) return;
    subteam && activeDepartmentTasks.setSubteam(subteam);
    eventId && activeDepartmentTasks.setEventId(eventId);
    description && activeDepartmentTasks.setDescription(description);
    assignee && activeDepartmentTasks.setAssignee(assignee);
    priority && activeDepartmentTasks.setPriority(priority);
    plan && activeDepartmentTasks.setPlan(plan);
    financialComment &&
      activeDepartmentTasks.setFinancialComment(financialComment);

    setActiveDepartmentTasks(null);

    if (!currentUser) {
      setCurrentPage("Login");
      return;
    }
    currentUser.canCreateDepartmentTasks()
      ? setCurrentPage("DepartmentTaskDisplay")
      : setCurrentPage("UserTasksDisplay");
  };

  /** Read Employees from 'database' and create class instances from them */
  React.useEffect(() => {
    const allEmployees: Employee[] = [];
    jsonEmployees.forEach((employee) => {
      const employeeRole: EmployeeRole = isOfTypeEmployeeRole(employee.role)
        ? employee.role
        : "Unknown Role";

      allEmployees.push(
        new Employee(
          employee.name.toLowerCase(),
          employee.email,
          employee.password,
          employeeRole
        )
      );
    });
    setEmployees(allEmployees);
  }, []);

  /** Read Events from 'database' and create class instances from them */
  React.useEffect(() => {
    const events: EventPlan[] = [];
    jsonEventPlans.forEach((event) => {
      const parsedEventStatus: EventStatus = isOfTypeEventStatus(event.status)
        ? event.status
        : "Pending";

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
          parsedEventStatus,
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
  }, []);

  /** Read Financial Requests from 'database' and create class instances from them */
  React.useEffect(() => {
    const finReqs: FinancialRequest[] = [];
    jsonFinancialRequests.forEach((fr) => {
      const parsedRequestStatus: RequestStatus = isOfTypeRequestStatus(
        fr.status
      )
        ? fr.status
        : "Pending";
      finReqs.push(
        new FinancialRequest(
          fr.requestingDept,
          fr.eventId,
          fr.requiredAmount,
          fr.reason,
          parsedRequestStatus
        )
      );
    });
    setAllFinancialRequests(finReqs);
  }, []);

  /** Read Recruitment Requests from 'database' and create class instances from them */
  React.useEffect(() => {
    const recReqs: RecruitmentRequest[] = [];
    jsonRecruitmentRequests.forEach((rr) => {
      const parsedRequestStatus: RequestStatus = isOfTypeRequestStatus(
        rr.status
      )
        ? rr.status
        : "Pending";
      recReqs.push(
        new RecruitmentRequest(
          rr.requestingDept,
          rr.eventId,
          rr.jobTitle,
          rr.jobDescript,
          parsedRequestStatus
        )
      );
    });
    setAllRecruitmentRequests(recReqs);
  }, []);

  /** Read department tasks from 'database' and create class instances from them */
  React.useEffect(() => {
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

      const parsedSubteam = isOfTypeSubteam(subteam) ? subteam : "Decorations";
      const parsedPriority = isOfTypePriority(priority) ? priority : "Medium";

      depTasks.push(
        new DepartmentTask(
          parsedSubteam,
          eventId,
          description,
          assignee,
          parsedPriority,
          plan,
          financialComment
        )
      );
    });
    setAllDepartmentTasks(depTasks);
  }, []);

  return (
    <div className="App">
      {/** If not logged in, the user can only see the login page */}
      {!currentUser && (
        <Login
          employees={employees}
          handleGoodUser={handleGoodUser}
          handleBadUser={handleBadUser}
        />
      )}
      {/** If user is logged in, they can see other stuff */}
      {currentUser && (
        <>
          <button /** Logout button */
            onClick={() => {
              handleBadUser();
              handleOnBack();
              setCurrentPage("Login");
            }}
            style={{ margin: "10px" }}
          >
            Logout
          </button>

          <div>
            <h3>
              Welcome, {currentUser.name.toUpperCase()}! Your role is:{" "}
              {currentUser.role}
            </h3>
          </div>

          {currentPage === "Homepage" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                border: "dashed",
                padding: "20px",
              }}
            >
              <h2 style={{ marginTop: "0" }}>Your dashboard</h2>
              {currentUser.canCreateEvent() && (
                <button onClick={() => setCurrentPage("EventEdit")}>
                  Create new event
                </button>
              )}
              {currentUser.canViewEvent() && (
                <button onClick={() => setCurrentPage("EventDisplay")}>
                  View events
                </button>
              )}
              {currentUser.canCreateFinancialRequest() && (
                <button onClick={() => setCurrentPage("FinancialRequestEdit")}>
                  Create financial request
                </button>
              )}
              {currentUser.canViewFinancialRequest() && (
                <button
                  onClick={() => setCurrentPage("FinancialRequestDisplay")}
                >
                  View financial requests
                </button>
              )}
              {currentUser.canCreateRecruitmentRequest() && (
                <button
                  onClick={() => setCurrentPage("RecruitmentRequestEdit")}
                >
                  Create recruitment request
                </button>
              )}
              {currentUser.canViewRecruitmentRequest() && (
                <button
                  onClick={() => setCurrentPage("RecruitmentRequestDisplay")}
                >
                  View recruitment requests
                </button>
              )}
              {currentUser.canCreateDepartmentTasks() && (
                <button onClick={() => setCurrentPage("DepartmentTaskEdit")}>
                  Create department tasks
                </button>
              )}
              {currentUser.canCreateDepartmentTasks() && (
                <button onClick={() => setCurrentPage("DepartmentTaskDisplay")}>
                  View department tasks
                </button>
              )}
              {currentUser.isInSubteamAndNotManager() && (
                <button onClick={() => setCurrentPage("UserTasksDisplay")}>
                  View my tasks
                </button>
              )}
            </div>
          )}

          {currentPage === "EventDisplay" && (
            <EventDisplay
              events={allEvents}
              updateActiveEvent={updateActiveEvent}
              canEditEvent={currentUser.canEditEvent()}
              handleOnBack={handleOnBack}
            />
          )}

          {currentPage === "EventEdit" && (
            <EventPlanning
              handleNewEvent={handleNewEvent}
              handleUpdateEvent={handleUpdateEvent}
              handleOnBack={handleOnBack}
              isEditing={!!activeEvent}
              event={activeEvent}
              canEditEventDetails={currentUser.canEditEventDetails()}
              canAddFinancialComments={currentUser.canAddFinancialComments()}
              canRedirectToFinancialManager={currentUser.canRedirectToFinancialManager()}
              canRedirectToAdministrationManager={currentUser.canRedirectToAdministrationManager()}
              canRejectEvent={currentUser.canRejectEvent()}
              canAcceptEvent={currentUser.canAcceptEvent()}
            />
          )}

          {currentPage === "FinancialRequestEdit" && (
            <FinancialRequestEdit
              editedRequest={activeFinancialRequest}
              allEvents={allEvents}
              handleNewFinancialRequest={handleNewFinancialRequest}
              handleUpdateFinancialRequest={handleUpdateFinancialRequest}
              handleOnBack={handleOnBack}
              isEditing={!!activeFinancialRequest}
              canProcessRequest={currentUser.canProcessFinancialRequest()}
            />
          )}

          {currentPage === "FinancialRequestDisplay" && (
            <FinancialRequestDisplay
              canEditRequest={currentUser.canEditFinancialRequest()}
              handleOnBack={handleOnBack}
              financialRequests={allFinancialRequests}
              updateFinancialRequest={updateActiveFinancialRequest}
            />
          )}

          {currentPage === "RecruitmentRequestEdit" && (
            <RecruitmentRequestEdit
              editedRequest={activeRecruitmentRequest}
              allEvents={allEvents}
              handleNewRecruitmentRequest={handleNewRecruitmentRequest}
              handleUpdateRecruitmentRequest={handleUpdateRecruitmentRequest}
              handleOnBack={handleOnBack}
              isEditing={!!activeRecruitmentRequest}
              canProcessRequest={currentUser.canProcessRecruitmentRequest()}
            />
          )}

          {currentPage === "RecruitmentRequestDisplay" && (
            <RecruitmentRequestDisplay
              canEditRequest={currentUser.canEditRecruitmentRequest()}
              handleOnBack={handleOnBack}
              recruitmentRequests={allRecruitmentRequests}
              updateRecruitmentRequest={updateActiveRecruitmentRequest}
            />
          )}

          {currentPage === "DepartmentTaskEdit" && (
            <DepartmentTasks
              activeDepartmentTask={activeDepartmentTasks}
              isInProductionTeam={currentUser.isInProductionTeam()}
              allEvents={allEvents}
              isInSubteamAndNotManager={currentUser.isInSubteamAndNotManager()}
              handleNewDepartmentTask={handleNewDepartmentTask}
              handleUpdateDepartmentTask={handleUpdateDepartmentTask}
              handleOnBack={handleOnBack}
              potentialAssignees={employees.filter((employee) => {
                if (!employee.isInSubteamAndNotManager()) return false;
                if (currentUser.isInProductionTeam()) {
                  return employee.isInProductionTeam();
                } else if (currentUser.isInServicesTeam()) {
                  return employee.isInServicesTeam();
                }
                return false;
              })}
            />
          )}

          {currentPage === "DepartmentTaskDisplay" && (
            <DepartmentTasksDisplay
              isOnlyUserTasks={false}
              updateDepartmentTask={updateActiveDepartmentTask}
              departmentTasks={allDepartmentTasks.filter((task) => {
                if (currentUser.role === "Production Manager") {
                  return isOfTypeProductionSubteam(task.subteam);
                } else if (currentUser.role === "Service Manager") {
                  return isOfTypeServiceSubteam(task.subteam);
                } else return false;
              })}
              handleOnBack={handleOnBack}
            />
          )}

          {currentPage === "UserTasksDisplay" && (
            <DepartmentTasksDisplay
              isOnlyUserTasks={true}
              updateDepartmentTask={updateActiveDepartmentTask}
              departmentTasks={allDepartmentTasks.filter(
                (task) => task.assignee === currentUser.name
              )}
              handleOnBack={handleOnBack}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
