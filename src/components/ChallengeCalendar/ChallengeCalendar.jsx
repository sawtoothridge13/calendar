import 'react-calendar/dist/Calendar.css';
import './ChallengeCalendar.css';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import FormComponent from '../FormComponent/FormComponent';
import sportData from './sportData.json.json';

const ChallengeCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1));
  const [events, setEvents] = useState([]); // Local events state
  const navigate = useNavigate();

  // Function to transform preloaded events
  const transformPreloadedData = () => {
    return sportData.data.map((event) => {
      const [year, month, day] = event.dateVenue.split('-').map(Number);
      const [hour, minute, second] = event.timeVenueUTC.split(':').map(Number);
      const eventDate = new Date(
        Date.UTC(year, month - 1, day, hour, minute, second),
      ); // month is zero-based
      return {
        date: eventDate.toISOString(), // Save dates as ISO strings for consistency
        homeTeam: event.homeTeam?.name || 'TBD',
        awayTeam: event.awayTeam?.name || 'TBD',
        description: `${event.stage.name || 'Unknown Stage'} - ${
          event.originCompetitionName || 'Unknown Competition'
        }. ${
          event.result
            ? `${event.result.homeGoals ?? 0} - ${event.result.awayGoals ?? 0}`
            : 'Not yet played'
        }`,
      };
    });
  };

  // Load events from localStorage or preloaded data
  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    const preloadedEvents = transformPreloadedData();
    const mergedEvents = storedEvents
      ? mergeEvents(preloadedEvents, JSON.parse(storedEvents))
      : preloadedEvents;

    setEvents(mergedEvents);
    localStorage.setItem('events', JSON.stringify(mergedEvents));
  }, []);

  // Merge preloaded and stored events, avoiding duplicates
  const mergeEvents = (preloadedEvents, storedEvents) => {
    const eventSet = new Map();
    [...preloadedEvents, ...storedEvents].forEach((event) => {
      eventSet.set(event.date + event.homeTeam + event.awayTeam, event);
    });
    return Array.from(eventSet.values());
  };

  // Handle adding a new event
  const handleAddEvent = (newEvent) => {
    const updatedEvents = mergeEvents(events, [
      { ...newEvent, date: newEvent.date.toISOString() },
    ]);
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  // Handle date click to navigate to the EventDetailsPage with events for that date
  const handleDateClick = (date) => {
    const eventsForDate = events.filter(
      (event) => new Date(event.date).toDateString() === date.toDateString(),
    );

    navigate('/EventDetailsPage', {
      state: { eventsForDate }, // Pass only the events for the selected date
    });
  };

  // Handle month navigation
  const handleMonthChange = (direction) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + direction,
      1,
    );
    setCurrentDate(newDate);
  };

  // Check if a date has events
  const isDateWithEvent = (date) => {
    return events.some(
      (event) => new Date(event.date).toDateString() === date.toDateString(),
    );
  };

  // Get the current month's name
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
        onClickDay={handleDateClick} // Handle day click to navigate
        value={currentDate}
        activeStartDate={currentDate}
        minDate={new Date(2024, 0, 1)}
        maxDate={new Date(2024, 11, 31)}
        tileContent={({ date }) =>
          isDateWithEvent(date) ? <span className="event-dot"></span> : null
        }
        showNavigation={false}
      />
    </div>
  );
};

export default ChallengeCalendar;
