import "./navbar.scss"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const {dispatch}=useContext(DarkModeContext);
  return (
    <div className='navbar'>
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon"/>
            English
          </div>
          <div className="item" >
            <DarkModeOutlinedIcon className="icon" onClick={()=>dispatch({type:"TOGGLE"})}/>
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon"/>
          </div>
          <Link to="/notifications" style={{textDecoration:"none"}}>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon"/>
            <div className="counter">1</div>
          </div>
          </Link>.
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon"/>
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon"/>
          </div>
          <Link to="/profile">
          <div className="item">
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/primegears01.appspot.com/o/images%2Fprofile.jpg?alt=media&token=28b5ffab-8e6f-46c7-8e0a-a5d23ce34efc"
              alt="img" 
              className="avatar"
            />
          </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar