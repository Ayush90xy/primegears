import "./singletrans.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import EachTransaction from "../../components/eachtransaction/EachTransaction";

const SingleTrans = () => {
  return (
    <div className='singletrans'>
      <Sidebar/>
      <div className="singletransConatiner">
        <Navbar/>
        <div className="top">
          <EachTransaction/>
        </div>
      </div>
    </div>
  )
}

export default SingleTrans