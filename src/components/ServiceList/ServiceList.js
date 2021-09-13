import React from 'react';
import SideBar from '../SideBar/SideBar';
import './ServiceList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react';
import { useState } from 'react';
import loading from '../image/giphy-1--unscreen.gif'

const ServiceList = () => {
    const [data, setData] = useState([])
    const [deleteDocument, setDeleteDocument] = useState('')
    const [id, setId] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    useEffect(() => {
        fetch('http://localhost:8000/placeOrder')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            })
    }, [])

    const deleteProject = (id) => {
        const _id = { id }
        fetch('http://localhost:8000/placeOrder', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(_id)
        })
            .then(res => res.json())
            .then(data => {
                setDeleteDocument('successfully deleted')
                window.location.reload();
            })
            .catch(err => setError('something went wrong.'))
    }


    const admin = sessionStorage.getItem('admin')
    const user = JSON.parse(sessionStorage.getItem('user'))


    const status = (event) => {
        const value = event.target.value;
        fetch('http://localhost:8000/placeOrder',{
            method:'PATCH',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body:JSON.stringify({id,value})
        })
        .then(res => res.json())
        .then(data => setSuccess('successfully updated'))
    }

    const onClick = (id) => {
        setId(id)
    }

    return (
        <div class="row serviceList">
            <SideBar></SideBar>
            <div className="col-9 serviceListBody">
                <div className="dashboardHeader">
                    <h5>Service List</h5>
                    <h6>Pro Rasel</h6>
                </div>
                {
                    !admin ?
                        <div className="row allServices">
                            {
                                data.length > 0 ?
                                    data.map(data => {
                                        return (
                                            <>
                                                {
                                                    data.userEmail == user.email &&
                                                    <div className="service">
                                                        <img src={`data:${data.img.contentType};base64,${new Buffer(data.img.img.data).toString('base64')}`} alt="" />
                                                        <h5>{data.projectName}</h5>
                                                        <p>{data.details}</p>
                                                        <select className="form-control" name="" id="">
                                                            <option value={data.status}>{data.status}</option>
                                                        </select>
                                                        {
                                                            data.status == 'pending' && <button onClick={() => deleteProject(data._id)} className="delete form-control" href="">Delete</button>
                                                        }
                                                    </div>
                                                }
                                            </>
                                        )
                                    })
                                    :
                                    <div className="load">
                                        <img className="loading" src={loading} alt="" />
                                    </div>
                            }
                        </div>
                        :
                        <div className="col-9 allServiceList">
                            <div className="leftArrow">
                                <a href="">Scroll right for see full table<FontAwesomeIcon icon={faArrowRight} /></a>
                            </div>
                            <p className="text-success text-center error" >{success != '' && success}</p>
                            <table>
                                <tr className="firstRow">
                                    <td>Name</td>
                                    <td>Email ID</td>
                                    <td>Service Name</td>
                                    <td>Product Details</td>
                                    <td>Status</td>
                                    <td>Delete</td>
                                </tr>
                                {
                                    data.map(data => {
                                        return (
                                            <tr>
                                                <td>{data.name}</td>
                                                <td>{data.email}</td>
                                                <td>{data.projectName}</td>
                                                <td className="details">{data.details}</td>
                                                <td className="select"><select onClick={() => onClick(data._id)} onChange={status} name="" id="">
                                                    <option value={data.status}>{data.status}</option>
                                                    <option value="Pending">Pending</option>
                                                    <option value="On going">On going</option>
                                                    <option value="Done">Done</option>
                                                </select></td>
                                                <td><button onClick={() => deleteProject(data._id)} className="tableDelete">Delete</button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </table>
                        </div>
                }

            </div>
        </div>
    );
};

export default ServiceList;