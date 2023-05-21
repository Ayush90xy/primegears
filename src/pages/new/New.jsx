import { Button } from '@mui/material'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import './new.scss'
import { useEffect, useState } from 'react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db,storage  } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import {Alert}from '@mui/material';


const New = ({inputs,title,forCollection}) => {  
 
  const perValue=(forCollection==="customers") ? 100:null; 
  console.log(perValue)
  const [file,setFile]=useState("");
  const [data,setData]=useState({});
  const [per,setPer]=useState(perValue);
  const[error,setError]=useState({state:false,text:"Some error happened"})
  const navigate=useNavigate();

  useEffect(()=>{
    //console.log(data);
    const uploadFile=()=>{
      const metadata = {
       contentType: 'image/jpeg'
      };  
      const name=new Date().getTime()+file.name
      const storageRef = ref(storage, 'images/' + name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setPer(progress);
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
            setData((prev)=>({...prev,img:downloadURL}))
          });
        }
      );


          };
          file&&uploadFile();
        },[file])

        let regex1=/^[A-Z]/;

        let regex2=/[0-9]+/;

        const handleInput=(e)=>{
          const id=e.target.id;
          const value=e.target.value;
          let caps=regex1.test(value);
          let nums=regex1.test(value);
          console.log(e.target.name)
          const helpIt=id==="price"||id==="quantity"?true:false;
          if(!helpIt){
            if(id==="fname"||id==="name"||id==="brand"){
              setError({state:(!caps),text:"The entered value must start with capital letter"})
              setTimeout(()=>{setError({status:false})},4500)
              if(!caps){return}
            }
            if(id==="phone"){
              setError({state:(!nums),text:"Phone Numbers should only contain Numbers"})
              setTimeout(()=>{setError({status:false})},4500)
              if(!caps){return}
            }
            setData({...data,[id]:value,})
          }else{
              if(value<0){setError({state:true,text:"Invalid Number entered The values can not be negative"})
              e.target.value=null;
              setTimeout(()=>{
                setError({state:false});
              },4500)
            }
            setData({...data,[id]:Number(value)});
          }
          console.log(data)
        }

        const handleAdd=async(e)=>{
          e.preventDefault();
          try {
            const docRef = await addDoc(collection(db,forCollection), {
              ...data,
              timeStamp:serverTimestamp(),
            });
            navigate(-1);
            console.log("Document written with ID: ", docRef.id);
          } catch (err) {
            console.error("Error adding document: ", err);
          }
  }

  console.log(file);
   return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
          {error.state&&<Alert severity='error' style={{width:"40%"}} >{error.text}</Alert>}
        </div>
        <div className="bottom">
          <div className="left">
            <img
             src={
              file ? URL.createObjectURL(file):"https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                } 
             alt="" 
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">Image: <DriveFolderUploadOutlinedIcon className='icon' /></label>
                <input id="file" type="file" onChange={e=>setFile(e.target.files[0])} style={{display:"none"}} />
              </div>
              {inputs.map((input)=>{
                if(input.id==="type"){
                  return(
                    <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                     id={input.id} 
                     type={input.type} 
                     placeholder={input.placeholder} 
                     required={input.required} 
                     onChange={handleInput}
                     list={"types"}
                     /> 
                     <datalist id="types">
                      <option>Drills</option>
                      <option>Grinders</option>
                      <option>Hammer Drills</option>
                      <option>Hammer</option>
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
                      <option>Sanders and Polishers</option>
                      <option>Saftey Tools</option>
                      <option>Garden Tools</option>
                      <option>Router Bits</option>
                    </datalist>
                  </div>
                  )
                }
                return(
                  <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                   id={input.id} 
                   type={input.type} 
                   placeholder={input.placeholder} 
                   required={input.required} 
                   onChange={handleInput}
                   /> 
                </div>
                )
              })}
              <Button disabled={per!=null&&per<100} type='submit'>Send</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default New