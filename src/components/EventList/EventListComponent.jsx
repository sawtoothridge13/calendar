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
              hour12: false, // 24-hour format
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
                  <strong>Title:</strong> {event.title}
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
