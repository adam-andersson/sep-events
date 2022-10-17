import Employee from "./models/employee";
import Login from "./components/Login";
import jsonEmployees from "./database/employees.json";
import eventPlans from "./database/events.json";
import React, { useState } from "react";
import EventPlanning from "./components/EventPlanning";
import EventPlan from "./models/event";
import EventDisplay from "./components/EventDisplay";
import { EmployeeRole, isOfTypeEmployeeRole } from "./types/employeeRole";
import { EventStatus, isOfTypeEventStatus } from "./types/eventStatus";
import { WebsitePage } from "./types/websitePages";

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentUser, setCurrentUser] = useState<Employee | null>(null);

  const [currentPage, setCurrentPage] = useState<WebsitePage>("Login");

  const [allEvents, setAllEvents] = useState<EventPlan[]>([]);
  const [activeEvent, setActiveEvent] = useState<EventPlan | null>(null);

  const updateActiveEvent = (eventId: string) => {
    const selectedEvent = allEvents.find((event) => event.eventId === eventId);
    if (selectedEvent) {
      setCurrentPage("EventEdit");
      setActiveEvent(selectedEvent);
    }
  };

  const handleOnBack = () => {
    setActiveEvent(null);
    setCurrentPage("Homepage");
  };

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

  const handleGoodUser = (user: Employee) => {
    setCurrentUser(user);
    setCurrentPage("Homepage");
  };

  const handleBadUser = () => {
    setCurrentUser(null);
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
          employee.name,
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
    eventPlans.forEach((event) => {
      const parsedEventStatus: EventStatus = isOfTypeEventStatus(event.status)
        ? event.status
        : "Pending";
      const parsedAttendees = parseInt(event.attendees, 10);
      const parsedBudget = parseInt(event.budget, 10);
      events.push(
        new EventPlan(
          event.clientName,
          parsedEventStatus,
          new Date(event.startDate),
          new Date(event.endDate),
          event.eventType,
          parsedAttendees,
          parsedBudget
        )
      );
    });
    setAllEvents(events);
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
              setActiveEvent(null);
              setCurrentUser(null);
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
        </>
      )}
    </div>
  );
}

export default App;
