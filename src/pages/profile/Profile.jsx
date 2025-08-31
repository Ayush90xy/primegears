import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import "./profile.scss"
import { storage } from "../../firebase";
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { useState,useEffect } from "react"
//import { useNavigate } from "react-router-dom"
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { doc, getDoc ,updateDoc } from "firebase/firestore";
import {db } from "../../firebase"
import { Alert } from "@mui/material";

const Profile = () => {
 // const navigate=useNavigate();
  const[currentInfo,setCurrent]=useState({img:"https://firebasestorage.googleapis.com/v0/b/primegears01.appspot.com/o/images%2F1683827257299Image.jpg?alt=media&token=28f62b6b-db13-40ab-bdcb-291988a9eb9b",
  fname:"Ayush",lname:"Singh",email:"ayush90xy@gmail.com",phone:"8787657109",hobbies:"Singing,Book Reading",address:"Oakland Road,Shillong"
  });
  const[info,setInfom]=useState({});
  const[edit,setEdit]=useState(false);
  const [file,setFile]=useState();
  const [error,setError]=useState({state:false,text:"Some Error happened"});

  useEffect(()=>{
    console.log(process.env.REACT_APP_UID_PROFILE);
    const setInfo=async()=>{
      const docRef = doc(db, "user",process.env.REACT_APP_UID_PROFILE);
      const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setCurrent({...docSnap.data()});
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }
    }
    setInfo();
    const uploadFile=()=>{
      const metadata = {
       contentType: 'image/jpeg'
      };  
      const name=new Date().getTime()+"profile"
      const storageRef = ref(storage, 'images/' + name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          //setPer(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;

            default:
              break;
          }
        }, 
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              console.log("unauthorised upload")
              break;
            case 'storage/canceled':
              console.log("upload cancelled by user")
              break;
            case 'storage/unknown':
              console.log("unknown error occured")
              break;
            default:
              break;
          }
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            //console.log('File available at', downloadURL);
            //localStorage.setItem("profile-pic-Url",downloadURL)
            setInfom({...info,img:downloadURL});
          });
        }
      );


          };
          file&&uploadFile();
        },[file])


  const saveNewInfo=(x)=>{

    let regex1=/^[A-Z]/;
    let regex2=/[0-9]+/;

    let name=x.target.name;
    let value=x.target.value;

    let decide=regex1.test(value); 
    let decide2=regex2.test(value);

    if(name==="fname"||name==="address"){
      if(!decide){
        setError({state:(!decide),text:"Value must start with Capital Letters"})
        setTimeout(()=>{setError({})},4500);
        return;
      }
    }else if(name==="phone"){
      if(!decide2){
        setError({state:(!decide),text:"Phone Number must contain numbers only"})
        setTimeout(()=>{setError({})},4500);
        return;
      }
    }
    
    setInfom({...info,[name]:value});
    console.log(info);
  }

  const uploadNow=async()=>{
    const profRef = doc(db, "user",process.env.REACT_APP_UID_PROFILE)
    await updateDoc(profRef,info)
  }

  const doUpdate=(x)=>{
    if(edit){
      uploadNow();
      x.target.innerText="Edit";
      document.querySelectorAll(".valueForProfile").forEach(x=>x.hidden=false)
      setEdit(false);
    }else{
      x.target.innerText="Update";
      document.querySelectorAll(".valueForProfile").forEach(x=>x.hidden=true)
      setEdit(true);
    }
  }
  return (
    <div className='profile'>
      <Sidebar/>
      <div className="profileConatiner">
        <Navbar/>
        <div className="conatins">
          <div className="top">
            <h1>Your Profile</h1>
            {error.state&&<Alert severity="error" style={{width:"60%"}}>{error.text}</Alert>}
            <span onClick={doUpdate}>Edit</span>
          </div>
          <hr/>
          <div className="middle">
            <div className="img">
             {edit&&<><label htmlFor="fileUploder" ><DriveFolderUploadIcon/></label><input id="fileUploder" type="file"onChange={e=>setFile(e.target.files[0])} style={{display:"none"}}/></>}
             <img src={
               currentInfo.img
                }  alt="no Image" />
            </div>
            <div className="info">
              <span className="label">First Name : <span className="valueForProfile">{currentInfo.fname}</span>{edit&&(<><input type="text" name="fname"onChange={saveNewInfo}/></>)}</span>
              <span className="label">Last Name : <span className="valueForProfile">{currentInfo.lname}</span>{edit&&(<><input type="text" name="lname"onChange={saveNewInfo}/></>)}</span>
              <span className="label">Email : <span className="valueForProfile">{currentInfo.email}</span>{edit&&(<><input type="email" name="email" onChange={saveNewInfo}/></>)}</span>
              <span className="label">Phone : <span className="valueForProfile">{currentInfo.phone}</span>{edit&&(<><input type="text" maxLength={10} name="phone"onChange={saveNewInfo}/></>)}</span>
              <span className="label">Hobbies : <span className="valueForProfile">{currentInfo.hobbies}</span>{edit&&(<><input type="text" name="hobbies"onChange={saveNewInfo}/></>)}</span>
              <span className="label">Address : <span className="valueForProfile">{currentInfo.address}</span>{edit&&(<><input type="text" name="address"onChange={saveNewInfo}/></>)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile