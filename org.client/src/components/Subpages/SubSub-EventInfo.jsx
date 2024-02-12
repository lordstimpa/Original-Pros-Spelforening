import { useParams } from "react-router-dom";
import API from "../API/API";
import Loading from "../Subpages/Loading";
import { Helmet, HelmetProvider } from "react-helmet-async";

const EventInfo = () => {
  const { id } = useParams();
  const {
    data: eventInfo,
    isError,
    isLoading,
  } = API(
    `https://orgspelforening.azurewebsites.net/api/Events/all-event-information/${id}`
  );

  const formatDescription = (description) => {
    if (!description) return { __html: "" };

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const formattedDescription = description.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });

    const finalDescription = formattedDescription.replace(/\n/g, "<br>");
    return { __html: finalDescription };
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>ORG - Event Information</title>
        <meta
          name="description"
          content="View events hosted by Original Pros Gaming Association."
        />
      </Helmet>

      <div className="Title">
        <h1>EVENT</h1>
      </div>
      <div className="Info">
        <h2>Tidigare event</h2>
        {isLoading && (
          <div className="Loading">
            <Loading />
          </div>
        )}
        {isError && (
          <div className="Error">
            <p>Ett fel inträffade vid hämtning av event information.</p>
          </div>
        )}
        {!isLoading && !isError && eventInfo.length === 0 && (
          <div className="NotFound">
            <p>Ingen event information hittades.</p>
          </div>
        )}
        {!isLoading && !isError && eventInfo && (
          <>
            <div className="EventHeader">
              <h3 className="EventName">{eventInfo.name}</h3>
              <h3>
                {eventInfo.start_date} - {eventInfo.start_time} CET
              </h3>
            </div>

            <div>
              <p
                dangerouslySetInnerHTML={formatDescription(
                  eventInfo.description
                )}
              />
            </div>
          </>
        )}
      </div>
    </HelmetProvider>
  );
};

export default EventInfo;
