import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EventListComponent from '../components/EventList/EventListComponent';
import FormComponent from '../components/FormComponent/FormComponent';

const EventDetailsPage = () => {
  const location = useLocation();
  const preloadedEvents = location.state?.eventsForDate || []; // Retrieve events from state
  const [events, setEvents] = useState(preloadedEvents); // Maintain the events state

  // Add newly submitted event
  const handleAddEvent = (newEvent) => {
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);

    // Update localStorage for persistence
    const allEvents = JSON.parse(localStorage.getItem('events')) || [];
    localStorage.setItem('events', JSON.stringify([...allEvents, newEvent]));
  };

  // Retrieve all events from localStorage on initial load (if needed)
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    const mergedEvents = [...preloadedEvents, ...storedEvents];
    setEvents(mergedEvents);
  }, [preloadedEvents]);

  return (
    <div className="event-details-container">
      <h1>Event Details</h1>

      {/* Form for adding new events */}
      <div className="event-details-form">
        <FormComponent handleAddEvent={handleAddEvent} />
      </div>

      {/* List of events */}
      <EventListComponent events={events} />
    </div>
  );
};

export default EventDetailsPage;
