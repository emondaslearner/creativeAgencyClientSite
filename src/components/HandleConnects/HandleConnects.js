import React, { useState } from 'react';
import SideBar from '../SideBar/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react';
import './HandleConnects.css'

const HandleConnects = () => {
    const [success,setSuccess] = useState('')
    const [data,setData] = useState([])
    useEffect(() => {
        fetch('http://localhost:8000/connect')
        .then(res => res.json())
        .then(data => setData(data))
    },[])

    const deleteReview = (id) => {
        fetch('http://localhost:8000/connect',{
            method:'DELETE',
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
            },
            body:JSON.stringify({id})
        })
        .then(res => res.json())
        .then(data => window.location.reload())
    }
    return (
        <div className="row handleReviews">
            <SideBar></SideBar>
            <div className="col-9 handleReviewsBody">
                <div className="dashboardHeader">
                    <h5>Handle Reviews</h5>
                    <h6>Pro Rasel</h6>
                </div>
                <div className="handle">
                    <div className="leftArrow">
                        <a href="">Scroll right for see full table<FontAwesomeIcon icon={faArrowRight} /></a>
                    <p className="text-success text-center error" >{success != '' && success}</p>
                    </div>
                    <table class="handleTable">
                        <tr className="firstRow">
                            <td>Name</td>
                            <td>Email ID</td>
                            <td>Message</td>
                            <td>Delete</td>
                        </tr>
                        {
                            data.map(data => {
                                return (
                                    <tr>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>{data.sms}</td>
                                        <td><button onClick={() => deleteReview(data._id)} className="tableDelete">Delete</button></td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HandleConnects;