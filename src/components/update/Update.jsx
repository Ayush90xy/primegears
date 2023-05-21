import { useContext, useEffect, useState } from "react";
import "./update.scss";
import IdContext from "../../context/idContext";
import { collection, getDocs,doc, updateDoc, increment  } from "firebase/firestore";
import { db } from "../../firebase";
import { Alert } from "@mui/material";

const Update = () => {
  const value=useContext(IdContext);
  const [got,setGot]=useState({});
  const [toUpdate,setToUpdate]=useState({});
  const[trans,setTrans]=useState([]);
  const[ref,setRef]=useState([]);
  const[error,setError]=useState({state:false,text:"Some Error Happened"})
  useEffect(()=>{
    const doEffect=()=>{
        setGot({collectionN:value.state.collName,id:value.state.id})
    }
    doEffect();
    console.log(trans)
  },[value.state.collName])

  let defaultUse=[
    {
      key:"fname",
      label:"First Name",
      placeholder:"Enter updated first name",
      onError:"Enter a valid name",
      maxLength:34,
    }    
  ]
   
  const useCustomer=[
    {
      key:"fname",
      label:"First Name",
      placeholder:"Enter updated first name",
      onError:"Enter a valid name",
      maxLength:40,      
    },
    {
      key:"lname",
      label:"Last Name",
      placeholder:"Enter updated last name",
      onError:"Enter a valid name",
      maxLength:40,
    },
    {
      key:"email",
      label:" Email Id",
      placeholder:"Enter updated Email",
      onError:"Enter a valid email",
      maxLength:30,
    },
    {
      key:"phone",
      label:"Phone",
      placeholder:"Enter updated phone no.",
      onError:"Enter a valid Phone no",
      maxLength:10,
    },
    {
      key:"address",
      label:"Address",
      placeholder:"Enter updated address",
      onError:"Enter a valid Address",
      maxLength:255,
    },
  ]

  
  const useProduct=[
    {
      key:"brand",
      label:"Brand",
      placeholder:"Enter updated first name",
      onError:"Enter a valid name",
      type:"text",
      maxLength:25,
    },
    {
      key:"type",
      label:"Type",
      placeholder:"Enter updated type",
      onError:"Enter a valid name for type",
      type:"text",
      maxLength:25,
    },
    {
      key:"model",
      label:"Model",
      placeholder:"Enter updated Model",
      onError:"Enter a valid Model",
      type:"text",
      maxLength:25,
    },
    {
      key:"name",
      label:"Product Name",
      placeholder:"Enter updated Product Name",
      onError:"Enter a valid Phone no",
      type:"text",
      maxLength:80,
    },
    {
      key:"price",
      label:"Price Each",
      placeholder:"Enter updated address",
      onError:"Enter a valid Address",
      type:"number",
      maxLength:5,
    },
    {
      key:"quantity",
      label:"Update Quantity",
      placeholder:"Update Quantity",
      onError:"Enter a valid Address",
      type:"number",
      maxLength:2,
    },
    {
      key:"desc",
      label:"Description",
      placeholder:"Enter updated address",
      onError:"Enter a valid Address",
      type:"text",
    },
  ]
  let title="";
  switch(got.collectionN){
    case"products":{
      defaultUse=useProduct;
      title="Product's"
      break;
    }
    case"customers":{
      defaultUse=useCustomer;
      title="Customer's"
      break;
    }
    default:{
      //defaultUse=useProduct;
      break;
    }
  }

  const doSent=async(e)=>{
    e.preventDefault();
    //console.log("I am Happy")
      const querySnapshot = await getDocs(collection(db, "transactions"));
      let set=[]
        querySnapshot.forEach((doc) => {
         set.push({...doc.data(),id:doc.id});
      });
      setTrans(set)
      console.log(trans);

    if(got.collectionN==="products"){
      setProduct();
      
    }else if(got.collectionN==="customers"){
      setCustomer();
      console.log("now writing transactions")
    }else{
      return;
    }
  }
  
  const doWriteNow=async(forC,x)=>{
    if(forC==="products"){
      let r=x.quantity
      x={...x,quantity:increment(r)}
    }else if(forC==="transactions"){
      const docRef = doc(db,forC,x.id);
      await updateDoc(docRef,x);
      console.log("doc Writen");
      return;
    }
    const docRef = doc(db,forC,got.id);
    await updateDoc(docRef,x);
    console.log("doc Writen")
  }

  const setProduct=()=>{
    let list=[];
    for(let i=0;i<trans.length;i++){
      let k=trans[i].products;
      for(let j=0;j<k.length;j++){
        if(k[j].productId===got.id){
          k[j].productName=toUpdate.name;
          //doing This since every set product will have unique id....
          list.push(i);
          //also no need to check other products...
        }
      }
    }
    setRef(list);
     doWriteNow("products",toUpdate);
    let b="transactions";
    ref.forEach(u=>{
      try{
        doWriteNow(b,trans[u]);
      }catch(err){
        console.log(err);
        setError({status:true,text:"Some issue with server please try again"})
      }
    });
    console.log("Transactions written")
    console.log(ref);
  }

  const setCustomer=()=>{
    let a=0;
    let arr=[];
    for(;a<trans.length;){
      if(trans[a].customerId===`customers/${got.id}`){
        arr.push(a);
      }
      a=a+1;
    }
    console.log(arr);
    setRef(arr);
      doWriteNow("customers",toUpdate);
      let b="transactions"
      ref.forEach(u=>{
        doWriteNow(b,trans[u]);
      });
      console.log("Transactions written")
      console.log(ref);
  }


  const toSetUpdate=(x)=>{
    //validate(x);
    let regex=/^[A-Z]./
    let regex2=/[0-9]+/
    let y=x.target.name;
    if((y==="price")||(y==="quantity")){
      let val=Number.parseInt(x.target.value);
      if(val<1) {setError({state:true,text:"Invalid number please fill again"});
        setTimeout(()=>{setError({state:false})},5000)
       return}
      setToUpdate({...toUpdate,[y]:val})
    }else if(y==="fname"||y=="brand"||y==="name"){
      let j=x.target.value.match(regex)?false:true
      if(!j){
        setToUpdate({...toUpdate,[y]:x.target.value})
      }
      setError({state:j,text:"The first letter must be capital"})
      setTimeout(()=>{setError({state:false})},5000)
    }else{
      if(y==="phone"&&(!regex2.test(x.target.value))){
        setError({state:true,text:"You can only enter numbers in phone"})
        x.target.value=null;
        setTimeout(()=>{setError({state:false})},5000)
        return;
      }
      setToUpdate({...toUpdate,[y]:x.target.value});
    }
    console.log(toUpdate);
  }
  
  return (
    <div className="update">
      <h1>Update {title} Details {error.state&&<Alert severity="error" >{error.text}</Alert>}</h1>
      <div className="right">
        <form>
          <div className="formInput">
          {defaultUse.map((x)=>{
            if(x.key==="type"){
              return(
                <div key={x.key}>
                <label >{x.label}</label><input type={x.type} maxLength={x.maxLength} placeholder={x.placeholder} name={x.key} onChange={toSetUpdate} list="types"/>
                <datalist id="types">
                      <option>Drills</option>
                      <option>Grinders</option>
                      <option>Hammer</option>
                      <option>Hammer Drills</option>
                      <option>Cutters</option>
                      <option>Saws</option>
                      <option>Planners</option>
                      <option>Sander Polisher</option>
                      <option>Routers</option>
                      <option>Spanners</option>
                      <option>Sockets</option>
                      <option>Chisels</option>
                      <option>Pliers</option>
                      <option>ToolBox</option>
                      <option>Drivers</option>
                      <option>Wrentch</option>
                      <option>Clamps</option>
                      <option>Compressors</option>
                      <option>Pumps</option>
                      <option>Blade and Wheels</option>
                      <option>Vices</option>
                      <option>Bits</option>
                      <option>Files</option>
                      <option>Saftey Tools</option>
                      <option>Garden Tools</option>
                      <option>Sanders and Polishers</option>
                      <option>Router Bits</option>
                    </datalist>
                </div>
              )
            }
            return(
              <div key={x.key}>
              <label >{x.label}</label><input type={x.type} maxLength={x.maxLength} placeholder={x.placeholder} name={x.key} onChange={toSetUpdate}/>
              </div>
            )
          })}
          </div>
          <div>
          <button onClick={doSent}>Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Update