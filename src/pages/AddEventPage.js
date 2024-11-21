import './AddEventPage.css';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import EventListComponent from '../components/EventList/EventListComponent';
import FormComponent from '../components/FormComponent/FormComponent';

const AddEventPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate hook
  const preloadedEvents = location.state?.eventsForDate || [];
  const [events, setEvents] = useState(preloadedEvents);
  const [showForm, setShowForm] = useState(false);

  const handleAddEvent = (newEvent) => {
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);

    const allEvents = JSON.parse(localStorage.getItem('events')) || [];
    localStorage.setItem('events', JSON.stringify([...allEvents, newEvent]));

    setShowForm(false);
  };

  const handleDeleteEvent = (eventIndex) => {
    const updatedEvents = events.filter((_, index) => index !== eventIndex);
    setEvents(updatedEvents);

    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    const filteredStoredEvents = storedEvents.filter(
      (_, index) => index !== eventIndex,
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
      {/* Back to Calendar Button */}
      <button className="back-to-calendar-button" onClick={() => navigate('/')}>
        &larr; Back to Calendar
      </button>

      <h1>Scheduled Events</h1>

      <button
        className="toggle-form-button"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Hide Form' : 'Add Event'}
      </button>

      {showForm && (
        <div className="event-details-form">
          <FormComponent handleAddEvent={handleAddEvent} />
        </div>
      )}

      <EventListComponent
        events={events}
        handleDeleteEvent={handleDeleteEvent}
      />
    </div>
  );
};

export default AddEventPage;
