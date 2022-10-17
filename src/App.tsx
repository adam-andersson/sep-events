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

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentUser, setCurrentUser] = useState<Employee | null>(null);

  const [allEvents, setAllEvents] = useState<EventPlan[]>([]);
  const [activeEvent, setActiveEvent] = useState<EventPlan | null>(null);
  const [isEditingEvent, setIsEditingEvent] = useState<boolean>(false);

  const updateActiveEvent = (eventId: string) => {
    const selectedEvent = allEvents.find((event) => event.eventId === eventId);
    if (selectedEvent) {
      setIsEditingEvent(true);
      setActiveEvent(selectedEvent);
    }
  };

  const handleOnBack = () => {
    setActiveEvent(null);
    setIsEditingEvent(false);
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
    setIsEditingEvent(false);
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
    setIsEditingEvent(false);
  };

  const handleGoodUser = (user: Employee) => {
    setCurrentUser(user);
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
          <button
            onClick={() => {
              setActiveEvent(null);
              setIsEditingEvent(false);
              setCurrentUser(null);
            }}
          >
            Logout
          </button>

          <div>
            <h3>
              Welcome, {currentUser.name.toUpperCase()}! Your role is:{" "}
              {currentUser.role}
            </h3>
          </div>

          {isEditingEvent ? (
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
          ) : (
            <>
              {currentUser.canCreateEvent() && (
                <button onClick={() => setIsEditingEvent(true)}>
                  Create new event
                </button>
              )}
              <EventDisplay
                events={allEvents}
                updateActiveEvent={updateActiveEvent}
                canEditEvent={currentUser.canEditEvent()}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
