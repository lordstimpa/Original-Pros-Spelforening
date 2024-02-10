import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Vision = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>ORG - Vision</title>
        <meta
          name="description"
          content="Our combined values and ideas which creates the vision of Original Pros Gaming Association."
        />
      </Helmet>

      <div className="Title">
        <h1>OM ORG</h1>
      </div>
      <div className="Info">
        <div>
          <h2>Vår vision</h2>
        </div>
        <div>
          <p></p>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Vision;
