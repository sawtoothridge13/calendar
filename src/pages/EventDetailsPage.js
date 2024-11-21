import './EventDetailsPage.css';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import EventListComponent from '../components/EventList/EventListComponent';
import FormComponent from '../components/FormComponent/FormComponent';

const EventDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize the navigate function
  const preloadedEvents = location.state?.eventsForDate || [];
  const [events, setEvents] = useState(preloadedEvents);
  const [showForm, setShowForm] = useState(false); // Toggle state for the form

  const handleAddEvent = (newEvent) => {
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);

    const allEvents = JSON.parse(localStorage.getItem('events')) || [];
    localStorage.setItem('events', JSON.stringify([...allEvents, newEvent]));

    setShowForm(false); // Hide the form after adding the event
  };

  const handleDeleteEvent = (eventIndex) => {
    const updatedEvents = events.filter((_, index) => index !== eventIndex);
    setEvents(updatedEvents);
    // Optionally, update localStorage or parent state
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    const filteredStoredEvents = storedEvents.filter(
      (event, index) => index !== eventIndex,
    );
    localStorage.setItem('events', JSON.stringify(filteredStoredEvents));
  };

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    const mergedEvents = [...preloadedEvents, ...storedEvents];
    setEvents(mergedEvents);
  }, [preloadedEvents]);

  return (
    <div className="event-details-container">
      <h1>Event Details</h1>

      <button
        className="toggle-form-button"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Hide Form' : 'Add Event'}
      </button>

      {showForm && (
        <div className="event-details-form">
          <FormComponent handleAddEvent={handleAddEvent} />
          <EventListComponent
            events={events}
            handleDeleteEvent={handleDeleteEvent}
          />
        </div>
      )}

      {/* Back to Calendar Button */}
      <button
        className="back-to-calendar-button"
        onClick={() => navigate('/')} // Navigate to homepage
      >
        Back to Calendar
      </button>

      <EventListComponent events={events} />
    </div>
  );
};

export default EventDetailsPage;
