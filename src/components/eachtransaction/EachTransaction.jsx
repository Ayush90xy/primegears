import { useContext,useState,useEffect } from "react"
import "./eachtransaction.scss"
import IdContext from "../../context/idContext"
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";


const EachTransaction = () => {
  const defaultuse={
    customerId:"fvbobevirinpboe",
    customerName:"Suraj Dev Singh",
    invoiceNo:90,
    products:[{
      price:789,
      productId:"sdv74875976",
      productName:"Default Name",
      quantity:2,
      total:324,
    },{
      price:789,
      productId:"134474875976",
      productName:"Default Name",
      quantity:2,
      total:324,
    },{
      price:789,
      productId:"354748976",
      productName:"Default Name",
      quantity:2,
      total:324,
    },{
      price:789,
      productId:"35474875",
      productName:"Default Name",
      quantity:2,
      total:324,
    }],
    soldDate:new Date().getTime(),
    totalPrice:79878,
  }
  const data=useContext(IdContext);
  const [mydata,setMyData]=useState(defaultuse)
  useEffect(()=>{
    const getData=async()=>{
      const docRef = doc(db, "transactions",data.state.id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        let data=docSnap.data();
        setMyData({...data,id:docSnap.id});
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }      
    }
    getData();
    console.log(mydata)
  },[])

  return (
    <div className='eachtransaction'>
      <div className="top">
        <h1>Invoice No : <b>{mydata.invoiceNo}</b></h1>
        <h2>Customer Name : <b>{mydata.customerName}</b></h2>
        <h2>Grand Total : <b>&#8377; {mydata.totalPrice}</b></h2>
        <h3>Date Of Sale : <b>{`${(new Date(mydata.soldDate.seconds*1000).toLocaleDateString())}`}</b></h3>
      </div>
      <div className="middle">
        {mydata.products.map(x=>{return(

                <div className="item" key={x.productId}>
                  <span>Product Name : <b>{x.productName}</b></span>
                  <span>Quantity: <b>{x.quantity}</b></span>
                  <span>Total Sale: <b>&#8377; {x.total}</b></span>
                </div>
        )
        })}
      </div>
    </div>
  )
}

export default EachTransaction