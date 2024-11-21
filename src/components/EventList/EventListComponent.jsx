/**
 * EventListComponent displays a list of events with details and a delete button.
 * Props:
 * - events: Array of event objects to display.
 * - handleDeleteEvent: Function to handle event deletion.
 */

import './EventListComponent.css';
import { FaTrash } from 'react-icons/fa';

const EventListComponent = ({ events, handleDeleteEvent }) => {
  return (
    <div className="event-list">
      {events.length > 0 ? (
        events.map((event, index) => {
          const eventDate = new Date(event.date);
          const formattedDate = eventDate.toLocaleDateString(); // Format date
          const formattedTime = eventDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }); // Format time

          return (
            <div key={index} className="event-item">
              <div className="event-details">
                {/* Display event details */}
                <p>
                  <strong>Date:</strong> {formattedDate}
                </p>
                <p>
                  <strong>Time:</strong> {formattedTime}
                </p>
                <p>
                  <strong>Home Team:</strong> {event.homeTeam}
                </p>
                <p>
                  <strong>Away Team:</strong> {event.awayTeam}
                </p>
                <p>
                  <strong>Sport:</strong> {event.sport || 'N/A'}
                </p>
                <p>
                  <strong>Description:</strong> {event.description}
                </p>
              </div>
              {/* Delete button for the event */}
              <button
                className="delete-button"
                onClick={() => handleDeleteEvent(index)}
                aria-label="Delete Event"
              >
                <FaTrash />
              </button>
            </div>
          );
        })
      ) : (
        // Display a message if no events are available
        <p>No events to display</p>
      )}
    </div>
  );
};

export default EventListComponent;
