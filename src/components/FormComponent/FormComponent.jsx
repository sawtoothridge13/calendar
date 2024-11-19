import './FormComponent.css';
import React, { useState } from 'react';

const FormComponent = ({ handleAddEvent }) => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState(''); // New state for date input
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

  const handleEventDateChange = (e) => {
    setEventDate(e.target.value);
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
      eventDate.trim() === '' ||
      eventTime.trim() === ''
    ) {
      setError('Please fill out all fields.');
      return;
    }

    // Combine the date and time to create a full Date object
    const [year, month, day] = eventDate.split('-').map(Number);
    const [hours, minutes] = eventTime.split(':').map(Number);
    const eventDateTime = new Date(year, month - 1, day, hours, minutes);

    handleAddEvent(eventTitle, eventDescription, eventDateTime); // Pass the date-time along with title and description
    setEventTitle('');
    setEventDescription('');
    setEventDate('');
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

        <label htmlFor="eventDate">Event Date:</label>
        <input
          type="date"
          id="eventDate"
          value={eventDate}
          onChange={handleEventDateChange}
        />

        <label htmlFor="eventTime">Event Time:</label>
        <input
          type="time"
          id="eventTime"
          value={eventTime}
          onChange={handleEventTimeChange}
        />

        <label htmlFor="eventDescription">Event Description:</label>
        <textarea
          id="eventDescription"
          value={eventDescription}
          onChange={handleEventDescriptionChange}
        ></textarea>

        <button type="submit">Add Event</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default FormComponent;
