import { useState } from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from '../../components/navbar/Navbar'
import "./report.scss"
import Table from "../../components/table/Table"
import { collection, query, where, getDocs, Timestamp, orderBy } from "firebase/firestore";
import {db} from "../../firebase";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Alert } from "@mui/material"
import html2pdf from "html2pdf.js"



const Report = () => {

  const[date1,setDate1]=useState({seconds:0});
  const[date2,setDate2]=useState({seconds:0});
  const[data,setData]=useState(undefined)
  const[data2pass,setData2Pass]=useState(undefined);
  const[error,setError]=useState({state:false,text:"Unknown Error Happened"})
  const[canPrint,setCanPrint]=useState(false);


  const sortProduct=(doc)=>{
    let names=[];
    let object=[];
    doc.forEach(x=>{
      if(names.indexOf(x.productName)===-1){
      names.push(x.productName);
      object.push({name:x.productName,total:x.total,quantity:x.quantity})
      }
      else{
        let val=names.indexOf(x.productName);
        let value=object[val];
        object[val]={name:x.productName,total:value.total+x.total,quantity:value.quantity+x.quantity};
      }
    })
    setData2Pass(object);
  }

  const generateReport=async(e)=>{
    if(date1.seconds===0||date2.seconds===0){
      console.log("still Null")
      setError({state:true,text:"Both dates must be provided"})
      setTimeout(()=>{
        setError({state:false})
      },5000)
      return;
    }
    if(date1.seconds>date2.seconds){
      setError({state:true,text:"Start date cannot be more than End Date"})
      setTimeout(()=>{
        setError({state:false})
      },5000)
      return;
    }
    let got=[];
    let sent2products=[];
    console.log(date1)
    const q = query(collection(db, "transactions"), where("soldDate", ">=",date1),where("soldDate","<=",date2),orderBy("soldDate","desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
      got.push({...doc.data(),id:doc.id})
      });
    setData(got);
    console.log(got);
    got.forEach(x=>{
      sent2products.push(...x.products)
    })
      console.log(sent2products);
    sortProduct(sent2products);
    document.getElementById('reportsTable').hidden=false;
    setCanPrint(true)
  }

  const showVal1=(e)=>{
    const date=Timestamp.fromDate(new Date(e.target.value))
    setDate1(date);
    console.log(e.target.value);
  }
  const showVal2=(e)=>{
    const date=Timestamp.fromDate(new Date(e.target.value))
    setDate2(date);
    console.log(e.target.value);
  }

  const options = {
    filename: `${new Date().getTime()}-reports.pdf`,
    image: { 
      type: 'png', 
      quality: 1
    },
    pagebreak: { mode: 'avoid-all',after:'.table' },
    html2canvas: { 
      scale: 1 
    },
    jsPDF: { 
      unit: 'in', 
      format: 'a3', 
      orientation: 'portrait' 
    },
  }
  const handlePrint=async()=>{    
    const element = document.getElementById('reportsTable')
    console.log('started')
      html2pdf().from(element).set(options).save();
    console.log("done");
  }


  const date2dis1=new Date(date1.seconds*1000).toLocaleDateString()||"today"
  const date2dis2=new Date(date2.seconds*1000).toLocaleDateString()||"yesterday"


  return (
    <div className='report'>
      <Sidebar/>
      <div className="reportContainer">
        <Navbar/>
        <div className="top">
          <h1>Enter Start Date and End Date</h1>
          {error.state&&<Alert severity="error">{error.text}</Alert>}
          <span onClick={generateReport}>Generate</span>
        </div>
        <div className="middle">
        <form className='dateTaker'>
            <div className="inputs">
              <label>Start Date: </label><input type="date" onChange={x=>{showVal1(x);}}/>
            </div>
            <div className="inputs">
              <label>End Date: </label><input type="date" onChange={x=>{showVal2(x);}}/>
            </div>
            {canPrint&&<><span className="print" onClick={handlePrint}>Print</span></>}
          </form>
        </div>
        <div className="bottom">
          <div className="tableHolder" id={"reportsTable"} hidden={true}>
            <h1>Reports from {date2dis1} to {date2dis2}</h1>
            <Table sent={data} className="table"/>
            <div className="reportHolder">
              <h1>Products Involved</h1>
              <ResponsiveContainer width="100%"  aspect={2}>
                <AreaChart width={730} height={250} data={data2pass} margin={{ top: 10, right: 30, left: 30, bottom: 0 }}>
                <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="gray" />
                <YAxis stroke="gray"/>
                <CartesianGrid strokeDasharray="3 3" className="chartGrid"/>
                <Tooltip />
                <Area type="monotone" dataKey="total" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                <Area type="monotone" dataKey="quantity" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Report