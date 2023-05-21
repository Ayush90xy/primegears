import { useContext, useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import "./newTransaction.scss"
import TransactionTable from '../../components/transactiontable/TransactionTable'
import ProcessTransaction from '../../components/processtransaction/ProcessTransaction'
import TransContext from '../../context/transContext'
import { collection, query, getDocs } from "firebase/firestore";
import { db } from '../../firebase'


const NewTransaction = () => {

  const[invoice,setInvoice]=useState(0);

  const transactionObject=useContext(TransContext)
  useEffect(()=>{
    const getNums=async()=>{
      let  i=0;
      const q = query(collection(db, "transactions"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc=>{
        console.log(doc);
        i=i+1;
      }) 
      setInvoice(i);
    }
    getNums();
  },[])
  console.log(transactionObject.state);
  
  return (
    <div className='newTransaction'>
      <Sidebar/>
      <div className="newTransContainer" >
        <Navbar/>
        <div className="top">
          <h1 className='headTitle' id={"Header"}>New Transaction</h1>
        </div>
        <div className="middle" id={"middle"}>
          <TransactionTable invoiceNo={invoice} />          
        </div>
        <div className="bottom" id={"bottom"}hidden={true}>
          <ProcessTransaction  />
        </div>
      </div>
    </div>
  )
}

export default NewTransaction