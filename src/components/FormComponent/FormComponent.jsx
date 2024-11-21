/**
 * FormComponent allows users to add a new event.
 * Props:
 * - handleAddEvent: Function to handle adding an event to the state and storage.
 */

import './FormComponent.css';
import React, { useState } from 'react';

const FormComponent = ({ handleAddEvent }) => {
  // Form state for each field
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [sport, setSport] = useState('');
  const [error, setError] = useState('');

  /**
   * Handles form submission and validates input fields.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    if (
      homeTeam.trim() === '' ||
      awayTeam.trim() === '' ||
      eventDescription.trim() === '' ||
      eventDate.trim() === '' ||
      eventTime.trim() === '' ||
      sport.trim() === ''
    ) {
      setError('Please fill out all fields.');
      return;
    }

    // Construct event object
    const [year, month, day] = eventDate.split('-').map(Number);
    const [hours, minutes] = eventTime.split(':').map(Number);
    const eventDateTime = new Date(year, month - 1, day, hours, minutes);

    const newEvent = {
      homeTeam,
      awayTeam,
      description: eventDescription,
      date: eventDateTime,
      sport,
    };

    // Call handler and reset form
    handleAddEvent(newEvent);
    setHomeTeam('');
    setAwayTeam('');
    setEventDescription('');
    setEventDate('');
    setEventTime('');
    setSport('');
    setError('');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="homeTeam">Home Team:</label>
        <input
          type="text"
          id="homeTeam"
          value={homeTeam}
          onChange={(e) => setHomeTeam(e.target.value)}
        />
        <label htmlFor="awayTeam">Away Team:</label>
        <input
          type="text"
          id="awayTeam"
          value={awayTeam}
          onChange={(e) => setAwayTeam(e.target.value)}
        />
        <label htmlFor="eventDate">Event Date:</label>
        <input
          type="date"
          id="eventDate"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
        <label htmlFor="eventTime">Event Time:</label>
        <input
          type="time"
          id="eventTime"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
        />
        <label htmlFor="eventDescription">Event Description:</label>
        <textarea
          id="eventDescription"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
        ></textarea>
        <label htmlFor="sport">Sport:</label>
        <input
          type="text"
          id="sport"
          value={sport}
          onChange={(e) => setSport(e.target.value)}
        />
        <button type="submit">Add Event</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default FormComponent;
