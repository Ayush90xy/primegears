import { useEffect, useState,useContext } from "react";
import { customerColumn } from "../../datatablesouse";
import "./processtransaction.scss";
import { DataGrid } from "@mui/x-data-grid";
import { db } from "../../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import TransContext from "../../context/transContext";


const ProcessTransaction = () => {

  const contextVal=useContext(TransContext);
  const [data,setData]=useState([]);
  const [customerData,setConstData]=useState({});

  useEffect(()=>{
    const q = query(collection(db, "customers"));
    onSnapshot(q, (querySnapshot) => {
    const list = [];
    querySnapshot.forEach((doc) => {
        list.push({...doc.data(),id:doc.id});    
    });
  console.log("The docs are: ", list);
  setData(list);
  },(err)=>{console.log(err)});

  const Update=()=>{
    contextVal.setTrans({...contextVal.state,...customerData})
   }
   Update();

  },[customerData])

  const addCustomer=(e)=>{
    let k=document.getElementById("Hero")
    if(k){
      k.remove();
    }
    setConstData({customerId:`customers/${e.id}`,customerName:`${e.fname} ${e.lname}`})
    console.log(contextVal.state);
    let allAdds=document.querySelectorAll(".addBtnCustomer")
    allAdds.forEach((x)=>{
      x.hidden=true;
    })
    const constDiv=document.createElement("div");
    constDiv.setAttribute("class","DownText");
    constDiv.setAttribute("id","Hero");
    constDiv.innerHTML=`The customer you have selected is ${e.fname} ${e.lname}`;
    document.getElementsByClassName("processTransaction")[0].append(constDiv);
  }

  const actionColumn=[{field:"action",headerName:"Action",width:250,renderCell:(params)=>{
    return(
      <div className="cellAction">
        <button className="actionInput addBtnCustomer" onClick={()=>{addCustomer(params.row)}}>Add</button>
      </div>
    )
  }}]

  const goBack=()=>{
    document.getElementById("bottom").hidden=true;
    document.getElementById("addProduct").hidden=false;
  }

  const proceedNow=()=>{
    console.log(contextVal.state);
    document.getElementById("confirm").hidden=false;
    document.getElementById("bottom").hidden=true;
    document.getElementById("heroCont").hidden=false;
  }

  const goClear=()=>{
    document.querySelectorAll(".addBtnCustomer").forEach((t)=>{
      t.hidden=false;
    })
  }

  return (
    <div className="processTransaction">
      <div className="havingBtn">
      <h1>Select Customer</h1>
      <div className="selection">
      <span className="link" onClick={goBack}>GoBack</span>
      <span className="link clear" onClick={goClear}>Clear</span>
      <span className="link proceed" onClick={proceedNow}>Proceed</span>
      </div>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={customerColumn.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />  
    </div>
  )
}

export default ProcessTransaction