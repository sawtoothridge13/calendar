import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import EventListComponent from '../components/EventList/EventListComponent';
import FormComponent from '../components/FormComponent/FormComponent';

export const EventDetailsPage = () => {
  const location = useLocation();
  const initialEvents = location.state?.events || []; // Retrieve events passed from homepage
  const [events, setEvents] = useState(initialEvents); // Manage events locally on this page

  const handleAddEvent = (title, description, dateTime) => {
    const newEvent = {
      date: dateTime,
      title,
      description,
    };
    setEvents([...events, newEvent]); // Add the new event to the existing list
  };

  return (
    <div>
      <h1>Event Details</h1>
      <FormComponent handleAddEvent={handleAddEvent} />
      <EventListComponent events={events} />
    </div>
  );
};
