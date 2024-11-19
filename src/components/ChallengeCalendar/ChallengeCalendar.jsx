import 'react-calendar/dist/Calendar.css';
import './ChallengeCalendar.css';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import FormComponent from '../FormComponent/FormComponent'; // Ensure correct path
import sportData from './sportData.json.json'; // Adjust the path to your actual file location

const ChallengeCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1));
  const [events, setEvents] = useState([]); // Local events state
  const navigate = useNavigate();

  useEffect(() => {
    transformData();
  }, []);

  const transformData = () => {
    const transformedEvents = sportData.data.map((event) => {
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
      };
    });
    setEvents(transformedEvents);
  };

  const handleDateClick = (date) => {
    const eventsForDate = events.filter(
      (event) => event.date.toDateString() === date.toDateString(),
    );

    navigate('/EventDetailsPage', {
      state: { eventsForDate }, // Pass only the events for the selected date
    });
  };

  const handleAddEvent = (title, description, dateTime) => {
    const newEvent = {
      date: dateTime,
      title,
      description,
    };
    setEvents([...events, newEvent]); // Update local events
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
      <div className="form-container">
        <FormComponent handleAddEvent={handleAddEvent} />
      </div>
    </div>
  );
};

export default ChallengeCalendar;
