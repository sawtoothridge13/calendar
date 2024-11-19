import React, { useState } from 'react';
import styles from './FormComponent.css';

const FormComponent = ({ handleAddEvent }) => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState(''); // New state for date input
  const [eventTime, setEventTime] = useState(''); // New state for time input
  const [error, setError] = useState('');

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
    <div className={styles['form-container']}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="eventTitle">Event Title:</label>
        <input
          type="text"
          id="eventTitle"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />

        <label htmlFor="eventDescription">Event Description:</label>
        <textarea
          id="eventDescription"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
        ></textarea>

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

        <button type="submit">Add Event</button>
      </form>
      {error && <p className={styles['error-message']}>{error}</p>}
    </div>
  );
};

export default FormComponent;
