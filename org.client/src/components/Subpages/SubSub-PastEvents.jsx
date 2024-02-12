import API from "../API/API";
import { Link } from "react-router-dom";
import Loading from "../Subpages/Loading";
import { Helmet, HelmetProvider } from "react-helmet-async";

const PastEvents = () => {
  const {
    data: events,
    isError,
    isLoading,
  } = API(
    "https://orgspelforening.azurewebsites.net/api/Events/all-past-events"
  );

  return (
    <HelmetProvider>
      <Helmet>
        <title>ORG - Past Events</title>
        <meta
          name="description"
          content="View our past events we have hosted for our members at Original Pros Gaming Association!"
        />
      </Helmet>

      <div className="Title">
        <h1>EVENT</h1>
      </div>
      <div className="Info">
        <div>
          <h2>Tidigare event</h2>
        </div>
        {isLoading && (
          <div className="Loading">
            <Loading />
          </div>
        )}
        {isError && (
          <div className="Error">
            <p>Ett fel inträffade vid hämtning av tidigare event.</p>
          </div>
        )}
        {!isLoading && !isError && events.length === 0 && (
          <div className="NotFound">
            <p>Inga tidigare event hittades.</p>
          </div>
        )}
        {!isLoading &&
          !isError &&
          events &&
          events.map((event) => (
            <Link
              to={`/event/past-events/${event.id}`}
              key={event.id}
              className="EventContainer"
            >
              <div className="TextContainer">
                <h2>{event.name}</h2>
                <p>
                  {event.start_date} - {event.start_time} CET
                </p>
              </div>
              <img src={event.cover_source} alt="Event cover image." />
            </Link>
          ))}
      </div>
    </HelmetProvider>
  );
};

export default PastEvents;
