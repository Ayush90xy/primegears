import { useContext, useState } from 'react'
import './login.scss'
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


const Login = () => {
  const [error,setError]=useState(false)
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const navigate=useNavigate();

  const {dispatch2}=useContext(AuthContext);

  const handleLogin=(e)=>{
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      dispatch2({type:"LOGIN",payload:user})
      console.log(user);
      navigate("/");

    })
    .catch((e) => {
      setError(true);
      console.log(e);
    });

  }

  return (
    <div className='login'>
      <form onSubmit={handleLogin}>
        <h1>Prime Gears</h1>
        <input type="email" placeholder='email' onChange={e=>setEmail(e.target.value)}/>
        <input type="password" placeholder='password' onChange={e=>setPassword(e.target.value)}/>
        <button type="submit">Login</button>
        {error && <span>Wrong Email or Password !</span>}
      </form>
    </div>
  )
}

export default Login