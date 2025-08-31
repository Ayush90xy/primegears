// idContext.js
import { createContext } from "react";

const IdContext = createContext({
  id: null,
  setId: () => {}
});

export default IdContext;
