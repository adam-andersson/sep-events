import Employee from "./models/employee";
import Login from "./components/Login";
import jsonEmployees from "./database/employees.json";
import eventPlans from "./database/events.json";
import React, { useState } from "react";
import EventPlanning from "./components/EventPlanning";
import EventPlan from "./models/event";
import EventDisplay from "./components/EventDisplay";

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentUser, setCurrentUser] = useState<Employee | null>(null);
  const [allEvents, setAllEvents] = useState<EventPlan[]>([]);
  const [activeEvent, setActiveEvent] = useState<EventPlan | null>(null);

  const updateActiveEvent = (eventId: string) => {
    const selectedEvent = allEvents.find((event) => event.eventId === eventId);
    if (selectedEvent) setActiveEvent(selectedEvent);
  };

  const handleUpdateEvent = (
    clientName: string,
    eventType: string,
    startDate: Date,
    endDate: Date,
    attendees: number,
    budget: number
  ) => {
    if (!activeEvent) return;
    if (activeEvent.clientName !== clientName)
      activeEvent.setClientName(clientName);
    if (activeEvent.eventType !== eventType)
      activeEvent.setEventType(eventType);
    if (activeEvent.startDate !== startDate)
      activeEvent.setStartDate(startDate);
    if (activeEvent.endDate !== endDate) activeEvent.setEndDate(endDate);
    if (activeEvent.attendees !== attendees)
      activeEvent.setAttendees(attendees);
    if (activeEvent.budget !== budget) activeEvent.setBudget(budget);
  };

  const handleNewEvent = (
    clientName: string,
    eventType: string,
    startDate: Date,
    endDate: Date,
    attendees: number,
    budget: number
  ) => {
    const newEvent = new EventPlan(
      clientName,
      startDate,
      endDate,
      eventType,
      attendees,
      budget
    );
    setAllEvents([...allEvents, newEvent]);
  };

  const handleGoodUser = (user: Employee) => {
    setCurrentUser(user);
  };

  const handleBadUser = () => {
    setCurrentUser(null);
  };

  React.useEffect(() => {
    const allEmployees: Employee[] = [];
    jsonEmployees.forEach((employee) => {
      allEmployees.push(
        new Employee(
          employee.name,
          employee.email,
          employee.password,
          employee.role
        )
      );
    });
    setEmployees(allEmployees);
  }, []);

  React.useEffect(() => {
    const events: EventPlan[] = [];
    eventPlans.forEach((event) => {
      const parsedAttendees = parseInt(event.attendees);
      const parsedBudget = parseInt(event.budget);
      events.push(
        new EventPlan(
          event.clientName,
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
          <button onClick={() => setCurrentUser(null)}>Logout</button>

          <div>
            <h3>
              Welcome, {currentUser.name.toUpperCase()}! Your role is:{" "}
              {currentUser.role}
            </h3>
          </div>

          <EventPlanning
            handleNewEvent={handleNewEvent}
            handleUpdateEvent={handleUpdateEvent}
            isEditing={!!activeEvent}
            event={activeEvent}
          />

          <EventDisplay
            events={allEvents}
            updateActiveEvent={updateActiveEvent}
          />
        </>
      )}
    </div>
  );
}

export default App;
