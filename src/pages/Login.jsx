import React, { useState } from 'react'
import "../styles/Login.css"
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [userID,setUserID] = useState("");
    const [password,setUserPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) =>{
        e.preventDefault();
        if(userID=="admin" && password=="admin1234"){
            localStorage.setItem("isAdminLoggedIn",true);
            navigate("/dashboard");
            toast.success("Login Successful",{
                position:"top-right",
                autoClose:2000,
            });
        }
        else{
            toast.error("Wrong Credentials",{
                position:"top-right",
                autoClose:2000,
            });
        }
    }

  return (
      <div className="login_container">
         <img src="" alt="logo" className='login_logo' />
        <div className="login_box">
           
        <h2>Sign in to your admin account</h2>
        <form onSubmit={handleLogin} className='login_form'>

          <div className="input_group">
          <input type="text" placeholder="AdminID" value={userID} onChange={(e)=> setUserID(e.target.value)} required  />
          <span className="icon">&#128100;</span>
          </div>

          <div className="input_group">
          <input type="password" placeholder='enter your password' value={password} onChange={(e)=> setUserPassword(e.target.value)} required />
          <span className='icon'>&#128274;</span>
          </div>

          <div className="captcha_box">
            <input type="checkbox" id="captcha" required />
            <label htmlFor="captcha">I'm not a robot</label>
          </div>
          <button type='submit' className='login_button'>Login</button>
        </form>
        {/* <div className="forget_section">
            <p>Forgot Password &#x1F50D;</p>
        </div> */}
        </div>
      
      </div>
  )
}

export default Login
