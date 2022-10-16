import Employee from "./models/employee";
import Login from "./components/Login";
import jsonEmployees from "./database/employees.json";
import eventPlans from "./database/events.json";
import React, { useState } from "react";
import EventPlanning from "./components/EventPlanning";
import EventPlan from "./models/event";

function App() {
  const [employees, setEmployees] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [allEvents, setAllEvents] = useState([]);

  const handleNewEvent = (
    clientName,
    eventType,
    startDate,
    endDate,
    attendees,
    budget
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

  const handleGoodUser = (user) => {
    setCurrentUser(user);
  };

  const handleBadUser = () => {
    console.log("Bad Credentials");
    setCurrentUser(null);
  };

  React.useEffect(() => {
    const allEmployees = [];
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
    const events = [];
    eventPlans.forEach((event) => {
      events.push(
        new EventPlan(
          event.clientName,
          event.startDate,
          event.endDate,
          event.eventType,
          event.attendees,
          event.budget
        )
      );
    });
    setAllEvents(events);
  }, []);

  console.log(employees);
  console.log(allEvents);

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
      {currentUser && currentUser.role === "CS" && (
        <EventPlanning handleNewEvent={handleNewEvent} />
      )}
    </div>
  );
}

export default App;
