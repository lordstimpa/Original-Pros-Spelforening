import API from "../API/API";
import { Link } from "react-router-dom";
import Loading from "../Subpages/Loading";

const PastEvents = () => {
  const {
    data: events,
    isError,
    isLoading,
  } = API(`${process.env.API_URL}/api/Events/all-upcomming-events`);

  return (
    <>
      <div className="Title">
        <h1>EVENT</h1>
      </div>
      <div className="Info">
        <div>
          <h2>Kommande event</h2>
        </div>
        {isLoading && (
          <div className="Loading">
            <Loading />
          </div>
        )}
        {isError && (
          <div className="Error">
            <p>Ett fel inträffade vid hämtning av kommande event.</p>
          </div>
        )}
        {!isLoading && !isError && events.length === 0 && (
          <div className="NotFound">
            <p>Inga kommande event hittades.</p>
          </div>
        )}
        {events.map((event) => (
          <Link
            to={`/event/upcomming-events/${event.id}`}
            key={event.id}
            className="EventContainer"
          >
            <div className="TextContainer">
              <h2>{event.name}</h2>
              <p>
                {event.start_date} - {event.start_time}
              </p>
            </div>
            <img src={event.cover_source} alt="Event Cover" />
          </Link>
        ))}
      </div>
    </>
  );
};

export default PastEvents;
