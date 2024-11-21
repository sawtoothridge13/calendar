/**
 * ChallengeCalendar component displays a calendar with preloaded and user-added events.
 * Users can click on a date to view or add events for that date.
 */

import 'react-calendar/dist/Calendar.css';
import './ChallengeCalendar.css';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import sportData from './sportData.json.json'; // Preloaded sports event data

const ChallengeCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1)); // Default date for the calendar
  const [events, setEvents] = useState([]); // State to store all events
  const navigate = useNavigate();

  /**
   * Transforms preloaded sports data into event objects for the calendar.
   * @returns {Array} Array of transformed event objects.
   */
  const transformPreloadedData = () => {
    return sportData.data.map((event) => {
      const [year, month, day] = event.dateVenue.split('-').map(Number);
      const [hour, minute, second] = event.timeVenueUTC.split(':').map(Number);
      const eventDate = new Date(
        Date.UTC(year, month - 1, day, hour, minute, second),
      );

      return {
        date: eventDate.toISOString(),
        homeTeam: event.homeTeam?.name || 'TBD',
        awayTeam: event.awayTeam?.name || 'TBD',
        sport: event.sport || 'N/A',
        description: `${event.stage.name || 'Unknown Stage'} - ${
          event.originCompetitionName || 'Unknown Competition'
        }`,
      };
    });
  };

  /**
   * Merges preloaded events with stored user events, removing duplicates.
   * @param {Array} preloadedEvents - Events loaded from the sportData file.
   * @param {Array} storedEvents - Events retrieved from localStorage.
   * @returns {Array} Array of merged events.
   */
  const mergeEvents = (preloadedEvents, storedEvents) => {
    const eventSet = new Map();
    [...preloadedEvents, ...storedEvents].forEach((event) => {
      eventSet.set(event.date + event.homeTeam + event.awayTeam, {
        ...event,
      });
    });
    return Array.from(eventSet.values());
  };

  /**
   * Loads events from localStorage and merges them with preloaded events.
   */
  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    const preloadedEvents = transformPreloadedData();
    const mergedEvents = storedEvents
      ? mergeEvents(preloadedEvents, JSON.parse(storedEvents))
      : preloadedEvents;

    setEvents(mergedEvents);
    localStorage.setItem('events', JSON.stringify(mergedEvents));
  }, []);

  /**
   * Handles a user clicking on a date in the calendar.
   * Redirects to the AddEventPage with events for the selected date.
   * @param {Date} date - Date clicked by the user.
   */
  const handleDateClick = (date) => {
    const eventsForDate = events.filter(
      (event) => new Date(event.date).toDateString() === date.toDateString(),
    );

    navigate('/AddEventPage', {
      state: { eventsForDate },
    });
  };

  return (
    <div className="calendar-container">
      <h1>Challenge Calendar</h1>
      <Calendar
        onClickDay={handleDateClick} // Handle date click
        value={currentDate} // Default selected date
        tileContent={({ date }) =>
          events.some(
            (event) =>
              new Date(event.date).toDateString() === date.toDateString(),
          ) ? (
            <span className="event-dot"></span> // Show a dot if an event exists
          ) : null
        }
        showNavigation={true} // Show navigation buttons
      />
    </div>
  );
};

export default ChallengeCalendar;
