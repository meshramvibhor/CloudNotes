import {React, useState} from 'react'
import { useHistory } from 'react-router-dom'


const Login = () => {

    const [credentials, setCredentials] = useState({email:"", password:""})
    let history = useHistory()

    let handleSubmit = async (e)=>{
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email:credentials.email, password:credentials.password}),
          });

          const json = await response.json()
          console.log(json)

          if(json.success){
              localStorage.setItem('token', json.jwtData);
              history.push("/");
          }
          else{
              alert("Invalid Creds")
          }
    }

    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value}) 
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input value={credentials.email}type="email" className="form-control" id="email" name ="email" aria-describedby="emailHelp" onChange={onChange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input value={credentials.password}type="password" className="form-control" name="password" id="password" onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <br/>
            <p>If you don't have account. Create one by clicking on SignUp button</p>
        </div>
    )
}

export default Login