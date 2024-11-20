import 'react-calendar/dist/Calendar.css';
import './ChallengeCalendar.css';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import FormComponent from '../FormComponent/FormComponent';
import sportData from './sportData.json.json';

const ChallengeCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1));
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      const parsedEvents = JSON.parse(storedEvents).map((event) => ({
        ...event,
        date: new Date(event.date), // Convert date back to a Date object
      }));
      setEvents(parsedEvents);
    } else {
      transformData();
    }
  }, []);

  const transformData = () => {
    const transformedEvents = sportData.data.map((event) => {
      const [year, month, day] = event.dateVenue.split('-').map(Number);
      const [hour, minute, second] = event.timeVenueUTC.split(':').map(Number);
      const eventDate = new Date(
        Date.UTC(year, month - 1, day, hour, minute, second),
      );
      return {
        date: eventDate,
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
    setEvents(transformedEvents);
  };

  const handleDateClick = (date) => {
    const eventsForDate = events.filter(
      (event) => event.date.toDateString() === date.toDateString(),
    );

    navigate('/EventDetailsPage', {
      state: { eventsForDate, allEvents: events },
    });
  };

  const handleAddEvent = (newEvent) => {
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem(
      'events',
      JSON.stringify(
        updatedEvents.map((event) => ({
          ...event,
          date: event.date.toISOString(),
        })),
      ),
    );
  };

  const handleMonthChange = (direction) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + direction,
      1,
    );
    setCurrentDate(newDate);
  };

  const isDateWithEvent = (date) => {
    return events.some(
      (event) => event.date.toDateString() === date.toDateString(),
    );
  };

  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  return (
    <div className="calendar-container">
      <h1>My Calendar</h1>
      <div className="calendar-header">
        <button onClick={() => handleMonthChange(-1)}>&lt; Previous</button>
        <span className="month-name">
          {monthName} {currentDate.getFullYear()}
        </span>
        <button onClick={() => handleMonthChange(1)}>Next &gt;</button>
      </div>
      <Calendar
        className="react-calendar"
        onClickDay={handleDateClick}
        value={currentDate}
        activeStartDate={currentDate}
        minDate={new Date(2024, 0, 1)}
        maxDate={new Date(2024, 11, 31)}
        tileContent={({ date }) =>
          isDateWithEvent(date) ? <span className="event-dot"></span> : null
        }
        showNavigation={false}
      />
      <div className="form-container">
        <FormComponent handleAddEvent={handleAddEvent} />
      </div>
    </div>
  );
};

export default ChallengeCalendar;
