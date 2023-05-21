import { useState } from "react";
import IdContext from "./idContext";

const IdState=({children})=>{

  const[state,setState]=useState({});

  return(
    <IdContext.Provider value={{state,setIdProps:setState}}>
      {children}
    </IdContext.Provider>
  )
}

export default IdState