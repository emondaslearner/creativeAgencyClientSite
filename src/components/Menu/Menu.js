import React from 'react';
import './Menu.css';
import logo from '../image/logos/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faTimes } from '@fortawesome/free-solid-svg-icons'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Menu = () => {
    const showMenu = (e) => {
        e.preventDefault();
        document.querySelector('.menu-content nav').style.display = 'block';
        document.querySelector('.menu-content nav').style.opacity = '1';
        document.querySelector('.menu-content nav').classList.add('animate');
    }
    const hideMenu = (e) => {
        e.preventDefault();
        document.querySelector('.menu-content nav').style.display = 'none';
        document.querySelector('.menu-content nav').style.opacity = '0';
        document.querySelector('.menu-content nav').classList.remove('animate');
    }
    const user = JSON.parse(sessionStorage.getItem('user'))
    const admin = sessionStorage.getItem('admin')
    return (
        <div className="menu">
            <div className="menu-content">
                <img src={logo} alt="" />
                <nav>
                    <li><Link to="/">Home</Link></li>
                    <li><a href="#portfolio">Our Portfolio</a></li>
                    <li><a href="#feedback">Client Feedback</a></li>
                    <li><a href="#connect">Connect Us</a></li>
                    <li><Link to={admin ? '/serviceList':'/placeOrder'}>Dashboard</Link></li>
                    {
                        !user ? 
                            <li><Link className="button" to="/login">Login</Link></li>
                        :
                            <li><a onClick={
                                () => {
                                    if(admin){
                                        sessionStorage.removeItem('user')
                                        sessionStorage.removeItem('admin')
                                    }else{
                                        sessionStorage.removeItem('user')
                                    }
                                }
                            } className="button" href="">Sing out</a></li>
                    }
                    <div className="close">
                        <a onClick={hideMenu} href=""><FontAwesomeIcon icon={faTimes} /></a>
                    </div>
                </nav>
                <div className="bar">
                    <a onClick={showMenu} href=""><FontAwesomeIcon icon={faBars} /></a>
                </div>
            </div>
        </div>
    );
};

export default Menu;