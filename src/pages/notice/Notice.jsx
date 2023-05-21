import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import './notice.scss'
import { useEffect, useState } from "react";
import Notify from "../../components/notify/Notify";
import { collection, query, where,onSnapshot } from "firebase/firestore";
import{db} from "../../firebase";
//import Summary from "../../components/summary/Summary";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

const Notice = () => {
  
  const [items,setItems]=useState([]);
  const [isEmpty,setEmpty]=useState(false);

  useEffect(()=>{
    const q = query(collection(db, "products"),where("quantity","==",0));
    onSnapshot(q, (querySnapshot) => {
    const list = [];
    querySnapshot.forEach((doc) => {
        list.push({...doc.data(),id:doc.id});   
    });
  if(list.length===0){
    setEmpty(true);
  }else{
    setEmpty(false);
  }
  console.log("The docs are: ", list);
  setItems(list);
  },(err)=>{console.log(err)});
  },[])

  return (
    <div className='notice'>
      <Sidebar/>
      <div className="noticeContainer">
        <Navbar/>
        <div className="notices">
          {isEmpty&&<div className="noNotice">
            <h1>No Notifications for you</h1>
            <SentimentSatisfiedAltIcon className="icon"/>
           </div>}
          {items.map((x)=>{
            return(
              <Notify key={x.id} name={x.name} model={x.model} brand={x.brand}/>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Notice