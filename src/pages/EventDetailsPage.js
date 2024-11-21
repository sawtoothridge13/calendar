import './EventDetailsPage.css';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EventListComponent from '../components/EventList/EventListComponent';
import FormComponent from '../components/FormComponent/FormComponent';

const EventDetailsPage = () => {
  const location = useLocation();
  const preloadedEvents = location.state?.eventsForDate || [];
  const [events, setEvents] = useState(preloadedEvents);
  const [showForm, setShowForm] = useState(false); // Toggle state for the form

  // Function to handle adding a new event
  const handleAddEvent = (newEvent) => {
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);

    const allEvents = JSON.parse(localStorage.getItem('events')) || [];
    localStorage.setItem('events', JSON.stringify([...allEvents, newEvent]));

    setShowForm(false); // Hide the form after adding the event
  };

  // Function to handle deleting an event
  const handleDeleteEvent = (eventIndex) => {
    // Remove the event from the local state
    const updatedEvents = events.filter((_, index) => index !== eventIndex);
    setEvents(updatedEvents);

    // Update localStorage to persist changes
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    const filteredStoredEvents = storedEvents.filter(
      (_, index) => index !== eventIndex,
    );
    localStorage.setItem('events', JSON.stringify(filteredStoredEvents));
  };

  // Load stored events and merge with preloaded events
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    const mergedEvents = [...preloadedEvents, ...storedEvents];
    setEvents(mergedEvents);
  }, [preloadedEvents]);

  return (
    <div className="event-details-container">
      <h1>Event Details</h1>

      {/* Button to toggle the add event form */}
      <button
        className="toggle-form-button"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Hide Form' : 'Add Event'}
      </button>

      {/* Show the add event form if toggle is active */}
      {showForm && (
        <div className="event-details-form">
          <FormComponent handleAddEvent={handleAddEvent} />
        </div>
      )}

      {/* Event List with delete functionality */}
      <EventListComponent
        events={events}
        handleDeleteEvent={handleDeleteEvent} // Pass the delete function
      />
    </div>
  );
};

export default EventDetailsPage;
