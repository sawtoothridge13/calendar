/**
 * AddEventPage displays events for a selected date and allows users to add or delete events.
 */

import './AddEventPage.css';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EventListComponent from '../components/EventList/EventListComponent';
import FormComponent from '../components/FormComponent/FormComponent';

const AddEventPage = () => {
  const location = useLocation(); // Access route state for preloaded events
  const navigate = useNavigate(); // Navigation hook for redirecting
  const preloadedEvents = location.state?.eventsForDate || []; // Events for the selected date
  const [events, setEvents] = useState(preloadedEvents); // State for all events on this page
  const [showForm, setShowForm] = useState(false); // State to toggle the form

  /**
   * Handles adding a new event.
   * @param {Object} newEvent - Event to add.
   */
  const handleAddEvent = (newEvent) => {
    const updatedEvents = [...events, newEvent]; // Add the new event to the list
    setEvents(updatedEvents);

    // Save to localStorage
    const allEvents = JSON.parse(localStorage.getItem('events')) || [];
    localStorage.setItem('events', JSON.stringify([...allEvents, newEvent]));

    setShowForm(false); // Close the form
  };

  /**
   * Handles deleting an event by its index.
   * @param {number} eventIndex - Index of the event to delete.
   */
  const handleDeleteEvent = (eventIndex) => {
    const updatedEvents = events.filter((_, index) => index !== eventIndex);
    setEvents(updatedEvents);

    // Update localStorage
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    const filteredStoredEvents = storedEvents.filter(
      (_, index) => index !== eventIndex,
    );
    localStorage.setItem('events', JSON.stringify(filteredStoredEvents));
  };

  /**
   * Loads all events (preloaded + localStorage) when the component mounts.
   */
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

      {/* Toggle Form Button */}
      <button
        className="toggle-form-button"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Hide Form' : 'Add Event'}
      </button>

      {/* Show Form if Toggled */}
      {showForm && (
        <div className="event-details-form">
          <FormComponent handleAddEvent={handleAddEvent} />
        </div>
      )}

      {/* Event List */}
      <EventListComponent
        events={events}
        handleDeleteEvent={handleDeleteEvent}
      />
    </div>
  );
};

export default AddEventPage;
