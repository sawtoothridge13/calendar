import './FormComponent.css';
import React, { useState } from 'react';

const FormComponent = ({ handleAddEvent }) => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventTime, setEventTime] = useState(''); // New state for time input
  const [error, setError] = useState('');

  const handleEventTitleChange = (e) => {
    setEventTitle(e.target.value);
    setError('');
  };

  const handleEventDescriptionChange = (e) => {
    setEventDescription(e.target.value);
    setError('');
  };

  const handleEventTimeChange = (e) => {
    setEventTime(e.target.value);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      eventTitle.trim() === '' ||
      eventDescription.trim() === '' ||
      eventTime.trim() === ''
    ) {
      setError('Please fill out all fields.');
      return;
    }

    // Combine the date and time to create a full Date object
    const [hours, minutes] = eventTime.split(':').map(Number);
    const eventDateTime = new Date();
    eventDateTime.setHours(hours, minutes, 0, 0);

    handleAddEvent(eventTitle, eventDescription, eventDateTime); // Pass the date-time along with title and description
    setEventTitle('');
    setEventDescription('');
    setEventTime('');
    setError('');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="eventTitle">Event Title:</label>
        <input
          type="text"
          id="eventTitle"
          value={eventTitle}
          onChange={handleEventTitleChange}
        />

        <label htmlFor="eventDescription">Event Description:</label>
        <textarea
          id="eventDescription"
          value={eventDescription}
          onChange={handleEventDescriptionChange}
        ></textarea>

        <label htmlFor="eventTime">Event Time:</label>
        <input
          type="time"
          id="eventTime"
          value={eventTime}
          onChange={handleEventTimeChange}
        />

        <button type="submit">Add Event</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default FormComponent;
