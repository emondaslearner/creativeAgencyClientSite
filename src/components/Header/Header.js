import React from 'react';
import './Header.css'
import Menu from '../Menu/Menu';
import headerImg from '../image/logos/Frame.png'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <Menu></Menu>
            <div className="row header-content">
                <div className="col-md-4 header-left">
                    <h2>Let's Grow Your Brand To The Next Level</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat nesciunt officiis dicta repellendus, dolorum provident.</p>
                    <Link to="/placeOrder" className="btn button">Hire Us</Link>
                </div>
                <div className="col-md-7 header-right">
                    <img className="img-fluid" src={headerImg} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Header;