import React from 'react';
import { useLocation } from 'react-router-dom';
import EventListComponent from '../components/EventList/EventListComponent';

export const EventDetailsPage = () => {
  const location = useLocation();
  const eventsForDate = location.state?.eventsForDate || []; // Safely retrieve the events

  return (
    <div>
      <h1>Event Details</h1>
      <EventListComponent events={eventsForDate} />
    </div>
  );
};
