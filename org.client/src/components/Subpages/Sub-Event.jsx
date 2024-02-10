import { Helmet, HelmetProvider } from "react-helmet-async";

const Event = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>ORG - Event</title>
        <meta
          name="description"
          content="Contact Original Pros Gamming Association!"
        />
      </Helmet>
      <div className="Title">
        <h1>EVENT</h1>
      </div>
      <div className="Info">
        <div>
          <h2>Event</h2>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Event;
