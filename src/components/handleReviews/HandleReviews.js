import React from 'react';
import SideBar from '../SideBar/SideBar';
import './handleReviews.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react';
import { useState } from 'react';

const HandleReviews = () => {
    const [data, setData] = useState([])
    const [success, setSuccess] = useState('')
    useEffect(() => {
        fetch('http://localhost:8000/review')
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
    }, [])

    const changeStatus = (id,status) => {
        let newStatus;
        if(status == 'Unapproved'){
            newStatus = 'Approved';
        }
        if(status == 'Approved'){
            newStatus = 'Unapproved'
        }

        const updates ={id,newStatus}

        fetch('http://localhost:8000/review',{
            method: 'PATCH',
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
            },
            body:JSON.stringify(updates)
        })
        .then(res => res.json())
        .then(data => {
            setSuccess('successfully updated')
            window.location.reload()
        })
    }

    const deleteReview = (id) => {
        fetch('http://localhost:8000/review',{
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
                    </div>
                    <p className="text-success text-center error" >{success != '' && success}</p>
                    <table>
                        <tr className="firstRow">
                            <td>Name</td>
                            <td>Email ID</td>
                            <td>Description</td>
                            <td>Status</td>
                            <td>Delete</td>
                        </tr>

                        {
                            data.map(data => {
                                return (
                                    <tr>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>{data.description}</td>
                                        <td>{
                                            data.status == 'Unapproved' ? 
                                            <button onClick={() => changeStatus(data._id,data.status)} className="btn apDanger">Unapproved</button>
                                            :
                                            <button onClick={() => changeStatus(data._id,data.status)} className="btn apSuccess">Approved</button>
                                            }</td>
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

export default HandleReviews;