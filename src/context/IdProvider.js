// IdProvider.js
import { useState } from "react";
import IdContext from "./idContext";

const IdProvider = ({ children }) => {
  // ✅ simple state: just the id
  const [id, setId] = useState(null);

  return (
    <IdContext.Provider value={{ id, setId }}>
      {children}
    </IdContext.Provider>
  );
};

export default IdProvider;
