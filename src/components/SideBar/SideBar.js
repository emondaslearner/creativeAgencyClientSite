import React from 'react';
import './SideBar.css'
import logo from '../image/logos/logo.png'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faList, faCommentAlt, faBars, faTimes,faComments } from '@fortawesome/free-solid-svg-icons'

const SideBar = () => {
    const showSideBar = (e) => {
        e.preventDefault()
        document.querySelector('.mainSideBar').style.display = 'block'
        document.querySelector('.mainSideBar').style.opacity = '1';
        document.querySelector('.showSideBar').style.display = 'none';
        document.querySelector('.mainSideBar').classList.add('showSlowlySideBar');
    }
    const hideSideBar = (e) => {
        e.preventDefault()
        document.querySelector('.mainSideBar').style.display = 'none'
        document.querySelector('.mainSideBar').style.opacity = '0';
        document.querySelector('.showSideBar').style.display = 'block';
        document.querySelector('.mainSideBar').classList.remove('showSlowlySideBar');
    }

    const admin = sessionStorage.getItem('admin')
    return (
        <>
            <div className="col-3 mainSideBar">
                <div className="col-3 sideBar">
                    <Link to="/"><img src={logo} alt="" /></Link>
                    {
                        !admin ?
                            <nav>
                                <Link to="/placeOrder"><li><FontAwesomeIcon icon={faShoppingCart} /><a href="">Order</a></li></Link>
                                <Link to="/serviceList"><li><FontAwesomeIcon icon={faList} /><a href="">Service list</a></li></Link>
                                <Link to="/review"><li><FontAwesomeIcon icon={faCommentAlt} /><a href="">Review</a></li></Link>
                            </nav>
                            :
                            <nav>
                                <Link to="/serviceList"><li><FontAwesomeIcon icon={faShoppingCart} /><a href="">Service list</a></li></Link>
                                <Link to="/handleReviews"><li><FontAwesomeIcon icon={faList} /><a href="">Reviews</a></li></Link>
                                <Link to="/AddAdmin"><li><FontAwesomeIcon icon={faCommentAlt} /><a href="">Make Admin</a></li></Link>
                                <Link to="/handleConnects"><li><FontAwesomeIcon icon={faComments} /><a href="">Connects</a></li></Link>
                            </nav>
                    }

                    <div className="hideSideBar">
                        <a onClick={hideSideBar} href=""><FontAwesomeIcon icon={faTimes} /></a>
                    </div>
                </div>
            </div>
            <div className="showSideBar">
                <a onClick={showSideBar} href=""><FontAwesomeIcon icon={faBars} /></a>
            </div>
        </>
    );
};

export default SideBar;