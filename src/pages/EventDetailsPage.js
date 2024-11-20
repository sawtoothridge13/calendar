import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EventListComponent from '../components/EventList/EventListComponent';
import FormComponent from '../components/FormComponent/FormComponent';

const EventDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [events, setEvents] = useState(location.state?.allEvents || []);
  const eventsForDate = location.state?.eventsForDate || [];

  const handleAddEvent = (newEvent) => {
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  return (
    <div className="event-details-container">
      <h1>Event Details</h1>
      <button onClick={() => navigate('/')} className="back-button">
        Back to Calendar
      </button>
      <FormComponent handleAddEvent={handleAddEvent} />
      <EventListComponent events={eventsForDate} />
    </div>
  );
};

export default EventDetailsPage;
