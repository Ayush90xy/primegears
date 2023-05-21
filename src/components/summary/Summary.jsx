import { useContext} from "react";
import "./summary.scss"
//import ChecklistIcon from '@mui/icons-material/Checklist';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import TransContext from "../../context/transContext";

const Summary = () => {
  const input=useContext(TransContext);
  let inputs;
  // useEffect(()=>{

  // },[input])
  const dummy={totalPrice:"23543",products:[{id:"1",productName:"DummyProduct1",price:"473",quantity:"10",total:"6754"},{id:"2",productName:"DummyProduct2",price:"44",quantity:"1",total:"44"},{id:"3",productName:"DummyProduct3",price:"403",quantity:"2",total:"643"},{id:"4",productName:"DummyProduct4",price:"4730",quantity:"1",total:"4730"}]}
  inputs=(input.isSet===false)?dummy:input.state
  return (
    <div className='summary'>
      <div className="heading">
        <ShoppingCartCheckoutIcon className="icon"/>
        <h1>Your Order Summary</h1>
      </div>
      <div className="summaryContents">
        <div className="productHeader">
            <span className="productTitle">PRODUCT</span>
            {inputs.products.map(x=>
              <span className="product" key={x.id}>{x.productName}</span>
            )}
          </div>
          <div className="productHeader">
            <span className="productTitle">PRICE</span>
            {inputs.products.map(x=>
              <span className="product" key={x.id}>{x.price}</span>
            )}
          </div>
          <div className="productHeader">
            <span className="productTitle">QTY</span>
            {inputs.products.map(x=>
              <span className="product" key={x.id}>{x.quantity}</span>
            )}
          </div>
          <div className="productHeader">
            <span className="productTitle">TOTAL</span>
            {inputs.products.map(x=>
              <span className="product" key={x.id}>{x.total}</span>
            )}
          </div>
      </div>
      <div className="total">
            <h2>Grand Total: <b>&#8377; {inputs.totalPrice}</b></h2>
      </div>
    </div>
  )
}

export default Summary