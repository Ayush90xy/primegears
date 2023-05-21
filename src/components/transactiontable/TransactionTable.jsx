import { DataGrid } from '@mui/x-data-grid'
import { productColumn } from '../../datatablesouse'
import { useEffect, useState,useContext } from 'react';
import { db } from '../../firebase';
import { addDoc, collection, doc, onSnapshot, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import "./transactionTable.scss"
import TransContext from "../../context/transContext";
import { Link, useNavigate } from 'react-router-dom';
import Summary from '../summary/Summary';
import { Alert } from '@mui/material';


const TransactionTable = ({invoiceNo}) => {
  const navigate=useNavigate();
  const contextVal=useContext(TransContext);
  const [transactions2,setTrans2]=useState([]);
  const [data,setData]=useState([]);
  const [transactions,setTransactions]=useState([]);
  const [error,setError]=useState(false);
  const [errorText,setErrorText]=useState("Some Error Occured")
  useEffect(()=>{

  const q = query(collection(db, "products"));
    onSnapshot(q, (querySnapshot) => {
    const list = [];
    querySnapshot.forEach((doc) => {
        list.push({...doc.data(),id:doc.id});    
    });
  console.log("The docs are: ", list);
  setData(list);
  },(err)=>{console.log(err)});

  console.log(transactions);
  
  const setTrans2Pre=()=>{
      let list=[];
      transactions.forEach((t)=>{
        list.push({id:t.productId,
          name:t.name,
          brand:t.brand,
          price:t.price,
          quantity:t.quantity,
          model:t.model,
          orignal:t.OrignalQty,
        });
      }
      )
      setTrans2(list);
  }
  setTrans2Pre();
  },[transactions])

  const getLastInvoice=()=>{
    const lastInvoice=Number(localStorage.getItem("lastInvoice"));
    localStorage.setItem("lastInvoice",(lastInvoice+1))
    return lastInvoice+1;

  }

  const doNeedFull=()=>{

    async function UpdateProd(){
      for(const t of transactions2){
        const productRef = doc(db, "products",t.id);
        await updateDoc(productRef, {
          quantity:(t.orignal-t.quantity),})
      }
    }
    UpdateProd()   
    const runAfter=async()=>{
      const docRef = await addDoc(collection(db, "transactions"), {
        ...contextVal.state,soldDate:serverTimestamp()
      });
      console.log("Transaction written with ID: ", docRef.id);
    }
    runAfter();
  }
  

  const doActualTransction=()=>{
    let productInfo=[];
    let total=0;
    transactions2.forEach((t)=>{
      productInfo.push({
        productId:t.id,
        quantity:t.quantity,
        productName:t.name,
        price:t.price,
        total:t.quantity*t.price,
      });
      total=total+t.price*t.quantity;
    })
    let newInvoice=getLastInvoice();
    contextVal.setTrans({...contextVal.state,products:productInfo,totalPrice:total,invoiceNo:invoiceNo});
    contextVal.doSet(true)
    document.getElementById("summaryQ").hidden=false;
}


  const handleAdd=(data)=>{
    const forInp= document.getElementById(data.id)
    const value= Number(forInp.value)
    if(value<=0||value===undefined||value===null||value>data.quantity){
      forInp.value=null;
      handleError(value);
      return;
    }else{
      setTransactions([...transactions,{productId:data.id,quantity:value,name:data.name,brand:data.brand,price:data.price,type:data.type,model:data.model,OrignalQty:data.quantity}])
    }
  }
  
  const handleError=(x)=>{
    if(x<0){
        setErrorText("Negative Number Not Accepted");
    }else if(x>0){
        setErrorText("Request exceed The Stock Amount")
    }else{
      setErrorText("Please Provide a Value")
    }
    setError(true)
    setTimeout(() => {
      setError(false);
    },4500);
  }

  const handleRemove=(id)=>{
    setTransactions(transactions.filter(item=>item.productId!==id))
    const inputMan=document.getElementById(id);
    inputMan.value=null
  }

  const actionColumn=[{field:"action",headerName:"Action",width:250,renderCell:(params)=>{
    return(
      <div className="cellAction">
        <label htmlFor="">Qty</label>
        <input type="number" name="" id={params.row.id} className='actionInput' />
        <button className="actionInput addBtn" onClick={()=>{handleAdd(params.row)}}>Add</button>
        <button className="actionInput removeBtn" onClick={()=>{handleRemove(params.row.id)}}>Remove</button>
      </div>
    )
  }}]
  const toUpdateColumn=[
    {field:'id',headerName:"ID",width:200},
    {field:'name',headerName:"Product Name",width:200},
    {field:'brand',headerName:"Brand",width:150},
    {field:'model',headerName:"Model",width:150},
    {field:'price',headerName:"Price",width:100},
    {field:'quantity',headerName:"Qty",width:100},
    {field:'totalPrice',headerName:"Total Price",width:100,renderCell:(params)=>{return(<>{params.row.quantity*params.row.price}</>)}}
    ]
    const actionColumn2=[{field:"action",headerName:"Action",width:250,renderCell:(params)=>{
      return(
        <div className="cellAction">
          <button className="actionInput removeBtn" onClick={()=>{handleRemove(params.row.id)}}>Remove</button>
        </div>
      )
    }}]

  return (
    <>
    <div className='transactionTable' id={"addProduct"}>
      <div className="transactionTableTitle" >
        <h2>Add Products To New Transaction</h2>
        {error&&<Alert severity="error" className='error'>{errorText}</Alert>}
        <span className='link' onClick={()=>{
          if(transactions2.length===0){
            console.log("empty tranaction");
            return;
          }
          document.getElementById("bottom").hidden=false;
          document.getElementById("addProduct").hidden=true;
        }}>Continue</span>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={productColumn.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 4 },
          },
        }}
        pageSizeOptions={[4, 10]}
        
      />
      <h1>Added Products:</h1>
      <DataGrid
          className="datagrid"
          rows={transactions2}
          columns={toUpdateColumn.concat(actionColumn2)}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}

      />
    </div>
    <div id={"confirm"} hidden={true}>
      <div id={"heroCont"} hidden={true}>
      <button onClick={
          ()=>{
            doActualTransction()
            document.getElementById("doTransactionBtn").hidden=false;
            }} id={"finalButton"} >
      Preview Transaction
      </button>
      <Link to="/">
      <button  id={"finalGoback"} > Cancel Transaction </button>
      </Link>
      <Link to="/transactions/done">
      <button onClick={doNeedFull} id={"doTransactionBtn"} hidden={true}>Confirm Transaction</button>
      </Link>
      </div>
      <div id={"summaryQ"} hidden={true}>
        <Summary />
      </div>
    </div>
    </>
  )
}

export default TransactionTable