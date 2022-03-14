import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



export const NavBar = () => {
    let location = useLocation();

    let history = useHistory()
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        history.push('/login')
    }

    useEffect(() => {
       
    }, [location]);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">CloudNotes</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={'nav-link ${location.pathname==="/"?"active":" "}'} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={'nav-link ${location.pathname==="/about"?"Sactive":" "}'} to="/about">About</Link>
                            </li>
                        </ul>
                       { !localStorage.getItem('token')?<form className='d-flex'>
                           <Link type="button" to="/login" class="btn btn-primary mx-2">LogIn</Link>
                           <Link type="button" to="/signup" class="btn btn-primary mx-2">SignUp</Link>
                           </form>: <button type="button" onClick={handleLogout} class="btn btn-primary mx-2">LogOut</button> }

                    </div>
                    
                </div>
            </nav>
        </div>
    );
};
