import { useState,useEffect, useContext } from "react";
import { customerColumn,productColumn,transactionColumn } from "../../datatablesouse";
import "./datatable.scss"
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { collection ,query,onSnapshot , doc , deleteDoc } from "firebase/firestore";
import {db} from "../../firebase"
import IdContext from "../../context/idContext";



const Datatable = ({forCol}) => {
  const idForSingle=useContext(IdContext);
  let toUseColumn;
  switch(forCol){
    case"customers":{
      toUseColumn=customerColumn;
      break;
    }
    case"products":{
      toUseColumn=productColumn;
      break;
    }
    case"transactions":{
      toUseColumn=transactionColumn;
      break;
    }
    default:{
      
      break;
    }
  }
  const [data,setData]=useState([]);
  useEffect(()=>{
    // const fetchData=async ()=>{
    //   let list=[];
    //   try{
    //     const querySnapshot = await getDocs(collection(db, "customers"));
    //     querySnapshot.forEach((doc) => {
    //       //console.log(doc.id, " => ", doc.data());
    //       list.push({id:doc.id,...doc.data()});
    //     });
    //     setData(list);
    //   }catch(err){
    //     console.log(err);
    //   }
    // };
    // fetchData();

    const q = query(collection(db, forCol));
    onSnapshot(q, (querySnapshot) => {
    const list = [];
    querySnapshot.forEach((doc) => {
        list.push({...doc.data(),id:doc.id});    
    });
  console.log("The docs are: ", list);
  setData(list);
  },(err)=>{console.log(err)});

  },[forCol])
  
  const handleDelete=async(id)=>{
    try{
    await deleteDoc(doc(db, forCol,id))
    setData(data.filter(item=>item.id!==id))
    }catch(err){
      console.log(err);
    }
  }

  const setIdContext=(id,collectionName)=>{
    if(forCol==="transactions")return;
    idForSingle.setIdProps({uniqueId:id,collectionOf:collectionName});
  }

  const actionColumn=[{field:"action",headerName:"Action",width:200,renderCell:(params)=>{
    return(
      <div className="cellAction">
        <Link to={`/${forCol}/${params.row.id}`} style={{textDecoration:"none"}}>        
        <div className="viewButton" onClick={()=>{setIdContext(params.row.id,forCol)}}>View</div>
        </Link>
        <div className="deleteButton" onClick={()=>handleDelete(params.row.id)}>Delete</div>
      </div>
    )
  }}]
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New {forCol}
        <Link to={`/${forCol}/new`} style={{textDecoration:"none"}} className="link">
          Add New
        </Link>
      </div>
       <DataGrid
        className="datagrid"
        rows={data}
        columns={toUseColumn.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  )
}

export default Datatable