import 'react-calendar/dist/Calendar.css';
import './ChallengeCalendar.css';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import sportData from './sportData.json.json'; // Adjust the path to your actual file location

const ChallengeCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 0, 1)); // Set initial date to January 1, 2024
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); // Use React Router navigation

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

  const isDateWithEvent = (date) => {
    return events.some(
      (event) => event.date.toDateString() === date.toDateString(),
    );
  };

  const handleDateClick = (date) => {
    const eventsForDate = events.filter(
      (event) => event.date.toDateString() === date.toDateString(),
    );

    if (eventsForDate.length > 0) {
      // Navigate to EventDetailsPage with events for the selected date
      navigate('/EventDetailsPage', { state: { events: eventsForDate } });
    }
  };

  return (
    <div className="calendar-container">
      <h1>My Calendar</h1>
      <Calendar
        className="react-calendar"
        onClickDay={handleDateClick} // Handle day click to navigate
        value={selectedDate}
        minDate={new Date(2024, 0, 1)} // January 1, 2024
        maxDate={new Date(2024, 0, 31)} // January 31, 2024
        tileContent={({ date }) =>
          isDateWithEvent(date) ? <span className="event-dot"></span> : null
        }
        showNavigation={false} // Hide navigation buttons
      />
    </div>
  );
};

export default ChallengeCalendar;
