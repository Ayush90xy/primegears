import "./widget.scss";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
//import GroupIcon from '@mui/icons-material/Group';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
//import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { useEffect,useState } from "react";
import {query,where,collection,getDocs} from "firebase/firestore"
import { db } from "../../firebase";
//import { KeyboardArrowDown } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Widget = ({type}) => {

  const [numbers,setNoms]=useState(0);

  let data;

    switch (type) {
      case "customer":
          data={
            title:"CUSTOMERS",
            query:"customers",
            isMoney:false,
            link:"see all users",
            icon:<PeopleAltOutlinedIcon className="icon" 
              style={{
                color:"crimson",
                backgroundColor:"rgba(255,0,0,0.2)"
              }}
            />,
          }
        break;
      case "transactions":
          data={
            title:"TRANSACTIONS",
            query:"transactions",
            isMoney:false,
            link:"view all transactions",
            icon:<ShoppingCartOutlinedIcon className="icon"
              style={{
                backgroundColor:"rgba(218,165,32,0.2)",
                color:"goldenrod"
              }}
            />,
          }
        break;
      case "earning":
          data={
            title:"EARNING",
            query:"transactions",
            isMoney:true,
            link:"view net earnings",
            icon:<MonetizationOnOutlinedIcon className="icon"
              style={{
                backgroundColor:"rgba(0,128,0,0.2)",
                color:"green"
              }}
            />,
          }
        break;
      case "products":
          data={
            title:"PRODUCTS",
            query:"products",
            isMoney:false,
            link:"see details",
            icon:<PrecisionManufacturingIcon className="icon"
              style={{
                backgroundColor:"rgba(128,0,128,0.2)",
                color:"purple"
              }}
            />,
          }
        break;
    
      default:
        break;
    }

  useEffect(()=>{
    const fetchNoms= async()=>{
      let y=[];
      let x=0;
      const q = query(collection(db,data.query));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        if(data.title==="EARNING"){
          let k=doc.data();
          x=x+k.totalPrice
        }else{
          y.push(doc.data());
        }
      }); 
      if(data.title==="EARNING"){
        setNoms(x)
      }else{
      setNoms(y.length);
      }
    }

    fetchNoms();
  },[])
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.isMoney && <>&#8377;</>} {numbers}</span>
        <span className="link"><Link to={`/${data.query}`}style={{textDecoration:"none" ,color:"GrayText"}}>{data.link}</Link></span>
      </div>
      <div className="right">
        {data.icon}
      </div>
    </div>
  )
}

export default Widget