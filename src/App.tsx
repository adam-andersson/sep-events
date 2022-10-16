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
    console.log(activeEvent.budget, budget, activeEvent);
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
      {!currentUser && (
        <Login
          employees={employees}
          handleGoodUser={handleGoodUser}
          handleBadUser={handleBadUser}
        />
      )}
      {currentUser && (
        <button onClick={() => setCurrentUser(null)}>Logout</button>
      )}
      {currentUser && <div>Welcome, {currentUser.name}</div>}
      {
        <EventPlanning
          handleNewEvent={handleNewEvent}
          handleUpdateEvent={handleUpdateEvent}
          isEditing={!!activeEvent}
          event={activeEvent}
        />
      }
      <EventDisplay events={allEvents} updateActiveEvent={updateActiveEvent} />
    </div>
  );
}

export default App;
