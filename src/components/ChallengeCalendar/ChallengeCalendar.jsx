import 'react-calendar/dist/Calendar.css';
import './ChallengeCalendar.css';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import EventListComponent from '../EventList/EventListComponent';
import FormComponent from '../FormComponent/FormComponent';
import sportData from './sportData.json.json'; // Adjust the path to your actual file location

const ChallengeCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1)); // Set initial date to January 2024
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 0, 1)); // Set initial selected date
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    transformData();
  }, []);

  const transformData = () => {
    const transformedEvents = sportData.data.map((event) => {
      // Extract year, month, day, hour, minute, second in UTC
      const [year, month, day] = event.dateVenue.split('-').map(Number);
      const [hour, minute, second] = event.timeVenueUTC.split(':').map(Number);
      const eventDate = new Date(
        Date.UTC(year, month - 1, day, hour, minute, second),
      ); // month is zero-based

      return {
        date: eventDate,
        title: `${event.homeTeam?.name || 'TBD'} vs ${
          event.awayTeam?.name || 'TBD'
        }`,
        description: `${event.stage.name} - ${event.originCompetitionName}. ${
          event.result
            ? `${event.result.homeGoals ?? 0} - ${event.result.awayGoals ?? 0}`
            : 'Not yet played'
        }`,
        stage: event.stage.name,
        competition: event.originCompetitionName,
      };
    });
    setEvents(transformedEvents);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = (title, description) => {
    const newEvent = {
      date: selectedDate,
      title,
      description,
    };
    setEvents([...events, newEvent]);
    setShowForm(false); // Hide the form after successful submission
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const isDateWithEvent = (date) => {
    return events.some(
      (event) => event.date.toDateString() === date.toDateString(),
    );
  };

  const filteredEvents = events.filter(
    (event) => event.date.toDateString() === selectedDate.toDateString(),
  );

  const handleMonthChange = (direction) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + direction,
      1,
    );
    setCurrentDate(newDate);
  };

  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  return (
    <div className="calendar-container">
      <h1>Challenge Calendar</h1>
      <div className="calendar-header">
        <button onClick={() => handleMonthChange(-1)}>&lt; Previous</button>
        <span className="month-name">
          {monthName} {currentDate.getFullYear()}
        </span>
        <button onClick={() => handleMonthChange(1)}>Next &gt;</button>
      </div>
      <Calendar
        className="react-calendar"
        onChange={handleDateChange}
        value={selectedDate}
        minDate={new Date(2024, 0, 1)} // Adjust if necessary
        maxDate={new Date(2024, 11, 31)} // Adjust if necessary
        activeStartDate={currentDate} // Use the currentDate for the active month
        tileContent={({ date }) =>
          isDateWithEvent(date) ? <span className="event-dot"></span> : null
        }
        showNavigation={false} // Disable default navigation
      />
      <div className="form-toggle">
        <button onClick={toggleForm}>
          {showForm ? 'Cancel' : 'Add Event'}
        </button>
      </div>
      {showForm && <FormComponent handleAddEvent={handleAddEvent} />}
      <EventListComponent events={filteredEvents} />
    </div>
  );
};

export default ChallengeCalendar;
