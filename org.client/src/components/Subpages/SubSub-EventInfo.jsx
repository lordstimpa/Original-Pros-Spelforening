import { useParams } from "react-router-dom";
import API from "../API/API";
import Loading from "../Subpages/Loading";

const EventInfo = () => {
  const { id } = useParams();
  const {
    data: eventInfo,
    isError,
    isLoading,
  } = API(`$https://orgspelforening.azurewebsites.net/api/Events/all-event-information/${id}`);

  const formatDescription = (description) => {
    return description ? description.replace(/\n/g, "<br>") : "";
  };

  return (
    <>
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
        {eventInfo && (
          <>
            <div className="EventHeader">
              <h3 className="EventName">{eventInfo.name}</h3>
              <h3>
                {eventInfo.start_date} - {eventInfo.start_time}
              </h3>
            </div>

            <div>
              <p>{formatDescription(eventInfo.description)}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EventInfo;
