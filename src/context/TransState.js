import { useState } from "react";
import TransContext from "./transContext";

const TransState=({children})=>{



  const[state,setState]=useState({})
  const[isSet,setDone]=useState(false);

  return(
    <TransContext.Provider value={{state,setTrans:setState,isSet,doSet:setDone}}>
      {children}
    </TransContext.Provider>
  )
}

export default TransState