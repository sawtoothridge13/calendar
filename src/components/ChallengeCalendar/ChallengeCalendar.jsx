import 'react-calendar/dist/Calendar.css';
import './ChallengeCalendar.css';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import sportData from './sportData.json.json';

const ChallengeCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1));
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

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

  const mergeEvents = (preloadedEvents, storedEvents) => {
    const eventSet = new Map();
    [...preloadedEvents, ...storedEvents].forEach((event) => {
      eventSet.set(event.date + event.homeTeam + event.awayTeam, {
        ...event,
      });
    });
    return Array.from(eventSet.values());
  };

  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    const preloadedEvents = transformPreloadedData();
    const mergedEvents = storedEvents
      ? mergeEvents(preloadedEvents, JSON.parse(storedEvents))
      : preloadedEvents;

    setEvents(mergedEvents);
    localStorage.setItem('events', JSON.stringify(mergedEvents));
  }, []);

  const handleDateClick = (date) => {
    const eventsForDate = events.filter(
      (event) => new Date(event.date).toDateString() === date.toDateString(),
    );

    navigate('/EventDetailsPage', {
      state: { eventsForDate },
    });
  };

  return (
    <div className="calendar-container">
      <h1>Challenge Calendar</h1>
      <Calendar
        onClickDay={handleDateClick}
        value={currentDate}
        tileContent={({ date }) =>
          events.some(
            (event) =>
              new Date(event.date).toDateString() === date.toDateString(),
          ) ? (
            <span className="event-dot"></span>
          ) : null
        }
        showNavigation={true}
      />
    </div>
  );
};

export default ChallengeCalendar;
