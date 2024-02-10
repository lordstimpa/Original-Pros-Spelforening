import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const AnnualReports = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>ORG - Annual Reports</title>
        <meta
          name="description"
          content="View our annual reports to keep up with out yearly goals and changes!"
        />
      </Helmet>

      <div className="Title">
        <h1>OM ORG</h1>
      </div>
      <div className="Info">
        <h2>Årsredovisningar</h2>
      </div>
    </HelmetProvider>
  );
};

export default AnnualReports;
