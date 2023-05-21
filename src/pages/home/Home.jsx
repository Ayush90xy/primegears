import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Widget from "../../components/widget/Widget"
import Featured from "../../components/featured/Featured"
import Chart from "../../components/chart/Chart"
import "./home.scss"
import Table from "../../components/table/Table"
import { collection, query,getDocs, orderBy, limit } from "firebase/firestore";
import { db } from "../../firebase"
import { useEffect,useState } from "react"

const Home = () => {

  const [data,setData]=useState([])

  useEffect(()=>{
    const tableInfo=async()=>{
      let p=[];
      const q = query(collection(db, "transactions"),orderBy("soldDate","asc"),limit(12));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        p.push({...doc.data(),id:doc.id})
        console.log(doc.id, " => ", doc.data());
      });      
      setData(p);
    }
    tableInfo();
  },[])
  return (
    <div className='home'>
      <Sidebar/>
      <div className="homeContainer">
        <Navbar/>
        <div className="widgets">
          <Widget type="customer" />
          <Widget type="products" />
          <Widget type="transactions" />
          <Widget type="earning" />
      </div>
      <div className="charts">
        <Featured />
        <Chart aspect={2/1} />
      </div>
      <div className="listContainer">
        <div className="listTitle">Latest Transactions</div>
        <Table sent={data}/>
      </div>
      </div>
    </div>
  )
}

export default Home