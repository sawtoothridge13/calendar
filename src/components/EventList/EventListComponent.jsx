import './EventListComponent.css';

const EventListComponent = ({ events }) => {
  return (
    <div className="event-list">
      <h2>Events</h2>
      {events && events.length > 0 ? (
        <ul>
          {events.map((event, index) => {
            const formattedDate = event.date.toLocaleDateString();
            const formattedTime = event.date.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            });

            return (
              <li key={index}>
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
