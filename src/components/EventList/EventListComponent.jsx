import './EventListComponent.css';
import { FaTrash } from 'react-icons/fa';

const EventListComponent = ({ events, handleDeleteEvent }) => {
  return (
    <div className="event-list">
      <h2>Events</h2>
      {events.length > 0 ? (
        <ul>
          {events.map((event, index) => {
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString();
            const formattedTime = eventDate.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div key={index} className="event-item">
                <li className="event-details">
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
                </li>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteEvent(index)}
                  aria-label="Delete Event"
                >
                  <FaTrash />
                </button>
              </div>
            );
          })}
        </ul>
      ) : (
        <p>No events to display</p>
      )}
    </div>
  );
};

export default EventListComponent;
