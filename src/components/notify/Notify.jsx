import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import "./notify.scss"
const Notify = ({name,brand,model}) => {
  return (
    <div className='notify'>
      <div className="notifyContainer">
        <div className="left">
          <ProductionQuantityLimitsIcon className='icon'/>
        </div>
        <div className="right">
          <span><b>{name}</b> is Out of Stock</span>
          <span className='brand'>Brand: {brand}</span>
          <span className='model'>Model: {model}</span>
        </div>
      </div>
    </div>
  )
}

export default Notify