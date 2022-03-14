import {React, useState} from "react";
import { useHistory } from 'react-router-dom'

const Signup = () => {
  const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""})
    let history = useHistory()

    let handleSubmit = async (e)=>{
        e.preventDefault()
        console.log(credentials)
        const response = await fetch("http://localhost:5000/api/auth/createid", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name:credentials.name, email:credentials.email, password:credentials.password}),
          });

          const json = await response.json()
          console.log(json)

          if(json.success){
            localStorage.setItem('token', json.jwtData);
            history.push("/");
        }
        else{
            alert(json.error)
        }
    }

    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value}) 
    }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Your Name
          </label>
          <input
            type="text"
            onChange={onChange}
            className="form-control"
            id="name"
            name ="name"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            onChange={onChange}
            className="form-control"
            id="email"
            name ="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={onChange}
            className="form-control"
            name ="password"
            id="password" required minLength={8}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            onChange={onChange}
            className="form-control"
            name ="Cpassword"
            id="Cpassword" required minLength={8}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;
