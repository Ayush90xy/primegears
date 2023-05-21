import './single.scss'
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Chart from '../../components/chart/Chart'
import Table from '../../components/table/Table'
import { useContext, useEffect, useState } from 'react'
import IdContext from '../../context/idContext'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { collection, query, where, getDocs } from "firebase/firestore";

const Single = () => {

  const UniqueData=useContext(IdContext);
  const [UData,setUseData]=useState({});
  const navigate=useNavigate();
  const [tableData,setTableData]=useState([]);

  useEffect(()=>{
    const fetchTransactions=async()=>{
      console.log("called featched transaction")
      console.log(UniqueData.state.uniqueId)
      let p=[];
      const q = query(collection(db, "transactions"), where("customerId", "==",`customers/${UniqueData.state.uniqueId}`));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        p.push({...doc.data(),id:doc.id})
      });
      setTableData(p)
    }

    fetchTransactions()


    const getData=async()=>{
      const docRef = doc(db,UniqueData.state.collectionOf,UniqueData.state.uniqueId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setUseData({...docSnap.data(),id:docSnap.id});
        console.log("Document data:",docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    getData();

  },[])
  let val0;
  let val1 ;
  let val2 ;
  let val3 ;
  let title;
  switch(UniqueData.state.collectionOf){
    case"customers":{
      title="Customer's "
      val0={holder:"Name :",data:(UData.fname+" "+UData.lname)}
      val1={holder:"Email :",data:UData.email}
      val2={holder:"Phone :",data:UData.phone}
      val3={holder:"Address :",data:UData.address}
      break
    }
    case"products":{
      title="Product's "
      val0={holder:"Product Name :",data:UData.name}
      val1={holder:"Price Each :",data:UData.price}
      val2={holder:"Current Stock :",data:UData.quantity}
      val3={holder:"Description :",data:UData.desc}
      break
    }
    default:{
      break
    }
  }

  const doUpdate=()=>{
    let value=UniqueData.state.collectionOf;
    let value2=UData.id;
    UniqueData.setIdProps({id:UData.id,collName:UniqueData.state.collectionOf})
    navigate(`/${value}/update/${value2}`);
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={doUpdate}>edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="profile-pic" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{`${title} Info:`}</h1>
                <div className="detailItem">
                  <span className="itemKey">{val0.holder}</span>
                  <span className="itemValue">{val0.data}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">{val1.holder}</span>
                  <span className="itemValue">{val1.data}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">{val2.holder}</span>
                  <span className="itemValue">{val2.data}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">{val3.holder}</span>
                  <span className="itemValue">{val3.data}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3/1} title="User Spending last 5 Months"/>
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <Table sent={tableData}/>
        </div>
      </div>
    </div>
  )
}

export default Single