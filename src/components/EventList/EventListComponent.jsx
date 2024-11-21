import './EventListComponent.css';
import { FaTrash } from 'react-icons/fa'; // Import Font Awesome trash icon

const EventListComponent = ({ events, handleDeleteEvent }) => {
  return (
    <div className="event-list">
      <h2>Events</h2>
      {events && events.length > 0 ? (
        <ul>
          {events.map((event, index) => {
            const eventDate = new Date(event.date); // Ensure `event.date` is a Date object
            const formattedDate = eventDate.toLocaleDateString();
            const formattedTime = eventDate.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false, // 24-hour format
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
                    <strong>Home Team:</strong> {event.homeTeam || 'TBD'}
                  </p>
                  <p>
                    <strong>Away Team:</strong> {event.awayTeam || 'TBD'}
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
