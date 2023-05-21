
import "./doUpdate.scss";
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Update from '../../components/update/Update'

const DoUpdate = () => {
  return (
    <div className="doupdate">
      <Sidebar/>
      <div className="doupdateContainer">
        <Navbar/>
        <div className="top">
          <Update/>
        </div>
      </div>
    </div>
  )
}

export default DoUpdate