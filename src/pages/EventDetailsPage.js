import './EventDetailsPage.css';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EventListComponent from '../components/EventList/EventListComponent';
import FormComponent from '../components/FormComponent/FormComponent';

const EventDetailsPage = () => {
  const location = useLocation();
  const preloadedEvents = location.state?.eventsForDate || [];
  const [events, setEvents] = useState(preloadedEvents);

  const handleAddEvent = (newEvent) => {
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);

    const allEvents = JSON.parse(localStorage.getItem('events')) || [];
    localStorage.setItem('events', JSON.stringify([...allEvents, newEvent]));
  };

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    const mergedEvents = [...preloadedEvents, ...storedEvents];
    setEvents(mergedEvents);
  }, [preloadedEvents]);

  return (
    <div className="event-details-container">
      <h1>Event Details</h1>

      <div className="event-details-form">
        <FormComponent handleAddEvent={handleAddEvent} />
      </div>

      <EventListComponent events={events} />
    </div>
  );
};

export default EventDetailsPage;
