import React, { useState } from "react";
/** Import types */
import { WebsitePage } from "./types/websitePages";
import {
  isOfTypeProductionSubteam,
  isOfTypeServiceSubteam,
} from "./types/subteam";
/** Import classes */
import Employee from "./models/employee";
import EventPlan from "./models/event";
import FinancialRequest from "./models/financialRequest";
import RecruitmentRequest from "./models/recruitmentRequest";
import DepartmentTask from "./models/departmentTask";
/** Import components */
import Login from "./components/Login";
import EventPlanning from "./components/EventPlanning";
import EventDisplay from "./components/EventDisplay";
import FinancialRequestEdit from "./components/FinancialRequestEdit";
import FinancialRequestDisplay from "./components/FinancialRequestDisplay";
import RecruitmentRequestEdit from "./components/RecruitmentRequestEdit";
import RecruitmentRequestDisplay from "./components/RecruitmentRequestDisplay";
import DepartmentTasks from "./components/DepartmentTasks";
import DepartmentTasksDisplay from "./components/DepartmentTasksDisplay";
/** Import helpers */
import loadDatabases from "./helpers/databaseLoader";
import Dashboard from "./components/Dashboard";

function App() {
  /** Set up component states which will be the only source of truth during the runtime of the application */
  const [currentPage, setCurrentPage] = useState<WebsitePage>("Login");

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentUser, setCurrentUser] = useState<Employee | null>(null);

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
    setCurrentPage("Dashboard");
  };

  /** Handle login failure */
  const handleBadUser = () => {
    setCurrentUser(null);
  };

  /** Reset all active states and redirect to Dashboard when user clicks back button */
  const handleOnBack = () => {
    setActiveEvent(null);
    setActiveFinancialRequest(null);
    setActiveDepartmentTasks(null);
    setCurrentPage("Dashboard");
  };

  /** Change the event that is currently being edited */
  const updateActiveEvent = (eventId: string) => {
    const selectedEvent = allEvents.find((ep) => ep.eventId === eventId);
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
      (rr) => rr.requestId === requestId
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
    status: string,
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
    status: string,
    eventType: string,
    startDate: Date,
    endDate: Date,
    attendees: number,
    budget: number,
    financialComment: string
  ) => {
    if (!activeEvent) return;
    activeEvent.setClientName(clientName);
    activeEvent.setStatus(status);
    activeEvent.setEventType(eventType);
    activeEvent.setStartDate(startDate);
    activeEvent.setEndDate(endDate);
    activeEvent.setAttendees(attendees);
    activeEvent.setBudget(budget);
    activeEvent.setComments(financialComment);

    setActiveEvent(null);
    setCurrentPage("EventDisplay");
  };

  /** Handle the logic and call the constructor and update local state when a new financial request is created */
  const handleNewFinancialRequest = (
    requestingDept: string,
    eventId: string,
    requiredAmount: number,
    reason: string,
    status: string
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
    requestingDept: string,
    eventId: string,
    requiredAmount: number,
    reason: string,
    status: string
  ) => {
    if (!activeFinancialRequest) return;

    activeFinancialRequest.setRequestingDept(requestingDept);
    activeFinancialRequest.setEventId(eventId);
    activeFinancialRequest.setRequiredAmount(requiredAmount);
    activeFinancialRequest.setReason(reason);
    activeFinancialRequest.setStatus(status);

    setActiveFinancialRequest(null);
    setCurrentPage("FinancialRequestDisplay");
  };

  /** Handle the logic and call the constructor and update local state when a new recruitment request is created */
  const handleNewRecruitmentRequest = (
    requestingDept: string,
    eventId: string,
    jobTitle: string,
    jobDescript: string,
    status: string
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
    requestingDept: string,
    eventId: string,
    jobTitle: string,
    jobDescript: string,
    status: string
  ) => {
    if (!activeRecruitmentRequest) return;

    activeRecruitmentRequest.setRequestingDept(requestingDept);
    activeRecruitmentRequest.setEventId(eventId);
    activeRecruitmentRequest.setJobTitle(jobTitle);
    activeRecruitmentRequest.setJobDescript(jobDescript);
    activeRecruitmentRequest.setStatus(status);

    setActiveRecruitmentRequest(null);
    setCurrentPage("RecruitmentRequestDisplay");
  };

  /** Handle the logic and call the constructor and update local state when a new department task is created */
  const handleNewDepartmentTask = (
    subteam: string,
    eventId: string,
    description: string,
    assignee: string,
    priority: string,
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
    subteam: string,
    eventId: string,
    description: string,
    assignee: string,
    priority: string,
    plan: string,
    financialComment: string
  ) => {
    if (!activeDepartmentTasks) return;

    activeDepartmentTasks.setSubteam(subteam);
    activeDepartmentTasks.setEventId(eventId);
    activeDepartmentTasks.setDescription(description);
    activeDepartmentTasks.setAssignee(assignee);
    activeDepartmentTasks.setPriority(priority);
    activeDepartmentTasks.setPlan(plan);
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

  /** Read from 'database' and create class instances from them that is stored in component states */
  React.useEffect(() => {
    loadDatabases(
      setEmployees,
      setAllEvents,
      setAllFinancialRequests,
      setAllRecruitmentRequests,
      setAllDepartmentTasks
    );
  }, []);

  const getAssignableTeamMembers = () => {
    if (!currentUser) return [];
    return employees.filter((employee) => {
      if (!employee.isInSubteamAndNotManager()) return false;
      if (currentUser.isInProductionTeam()) {
        return employee.isInProductionTeam();
      } else if (currentUser.isInServicesTeam()) {
        return employee.isInServicesTeam();
      }
      return false;
    });
  };

  const getTasksOfDepartment = () => {
    if (!currentUser) return [];
    return allDepartmentTasks.filter((task) => {
      if (currentUser.role === "Production Manager") {
        return isOfTypeProductionSubteam(task.subteam);
      } else if (currentUser.role === "Service Manager") {
        return isOfTypeServiceSubteam(task.subteam);
      } else return false;
    });
  };

  const getCurrentUsersTasks = () => {
    if (!currentUser) return [];
    return allDepartmentTasks.filter(
      (task) => task.assignee === currentUser.name
    );
  };

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

          {currentPage === "Dashboard" && (
            <Dashboard
              currentUser={currentUser}
              setCurrentPage={setCurrentPage}
            />
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
              potentialAssignees={getAssignableTeamMembers()}
            />
          )}

          {currentPage === "DepartmentTaskDisplay" && (
            <DepartmentTasksDisplay
              isOnlyUserTasks={false}
              updateDepartmentTask={updateActiveDepartmentTask}
              departmentTasks={getTasksOfDepartment()}
              handleOnBack={handleOnBack}
            />
          )}

          {currentPage === "UserTasksDisplay" && (
            <DepartmentTasksDisplay
              isOnlyUserTasks={true}
              updateDepartmentTask={updateActiveDepartmentTask}
              departmentTasks={getCurrentUsersTasks()}
              handleOnBack={handleOnBack}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
