import "./featured.scss"
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from "../../firebase";

const Featured = () => {
  const[total,setTotal]=useState(0);

  useEffect(()=>{
    const useDate=new Date();
  const yesterday=Timestamp.fromDate(new Date(new Date().setDate(useDate.getDate()-1)));
  console.log("Yesterday is: ",yesterday)
    const getInfo=async()=>{
      let price=0;
      const q = query(collection(db, "transactions"), where("soldDate", ">", yesterday));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let x=doc.data();
        price+=x.totalPrice;
        console.log(doc.id, " => ", doc.data());
      });
      setTotal(price);      
    }
    getInfo();
  },[])
  return (
    <div className="featured">
      <div className="top">
        <div className="title">Total Revenue</div>
        <MoreVertOutlinedIcon fontSize="small"/>
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5}/>
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">&#8377; {total}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summarya">
          {/* <div className="itema">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownOutlinedIcon fontSize="small"/>
              <div className="resultAmount">&#8377;20K</div>
            </div>
          </div>
          <div className="itema">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">&#8377;13K</div>
            </div>
          </div>
          <div className="itema">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">&#8377;23K</div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Featured