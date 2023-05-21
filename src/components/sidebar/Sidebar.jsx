import "./sidebar.scss";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import HandymanIcon from '@mui/icons-material/Handyman';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const {dispatch2}=useContext(AuthContext);
  const {dispatch}=useContext(DarkModeContext);
  const handleLogout=()=>{
    dispatch2({type:"LOGOUT",payload:null})
  }
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{textDecoration:"none"}}>
        <span className="logo">PrimeGears</span>
        </Link>
      </div>
      <hr/>
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{textDecoration:"none"}}>        
          <li>
            <DashboardIcon className="icon"/>
            <span>Dashboard</span>
          </li>
          </Link>
          <p className="title">LIST</p>
          <Link to="/customers" style={{textDecoration:"none"}}>        
          <li>
            <PeopleIcon className="icon"/>
            <span>Customers</span>
          </li>
          </Link>
          <Link to="/products" style={{textDecoration:"none"}}>        
          <li>
            <HandymanIcon className="icon"/>
            <span>Products</span>
          </li>
          </Link>
          <Link to="/transactions" style={{textDecoration:"none"}}>
          <li>
            <ReceiptLongIcon className="icon"/>
            <span>Transactions</span>
          </li>
          </Link>
          <p className="title">USEFUL</p>
          <Link to="/notifications" style={{textDecoration:"none"}}>
          <li>
            <NotificationsNoneIcon className="icon"/>
            <span>Notifications</span>
          </li>
          </Link>
          <p className="title">SERVICE</p>
          <Link to="/reports" style={{textDecoration:"none"}}>
          <li>
            <AssessmentIcon className="icon"/>
            <span>Reports</span>
          </li>
          </Link>
          <Link to="/about" style={{textDecoration:"none"}}>
          <li>
            <SettingsIcon className="icon"/>
            <span>About</span>
          </li>
          </Link>
          <p className="title">USER</p>
          <Link to="/profile" style={{textDecoration:"none"}}>
          <li>
            <AccountCircleIcon className="icon"/>
            <span>Profile</span>
          </li>
          </Link>
          <Link to="/login" style={{textDecoration:"none"}} onClick={handleLogout}>
          <li>
            <LogoutIcon className="icon" />
            <span>Logout</span>
          </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
          <div className="colorOption" onClick={()=>dispatch({type:"LIGHT"})}></div>
          <div className="colorOption" onClick={()=>dispatch({type:"DARK"})}></div>
      </div>
    </div>
  )
}

export default Sidebar