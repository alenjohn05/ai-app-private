import React, { useState } from "react";

const GenerateAppContext = React.createContext([]);

function GenerateAppProvider({ children }) {
  const [GenerateAppDetails, setGenerateAppDetails] = useState({});

  const handleGenerateAppDetails = (data) => {
    setGenerateAppDetails(data);
  };

  return (
    <GenerateAppContext.Provider
      value={{GenerateAppDetails, handleGenerateAppDetails}}
    >
      {children}
    </GenerateAppContext.Provider>
  );
}

export { GenerateAppProvider, GenerateAppContext };
