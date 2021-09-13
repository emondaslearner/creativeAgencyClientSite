import React from 'react';
import './Feedbacks.css'
import client from '../image/download.jpg'
import { useState } from 'react';
import { useEffect } from 'react';

const Feedbacks = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        fetch('http://localhost:8000/review')
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
    }, [])

    return (
        <div id="feedback" className="feedbacksMain" >
            <h2 className="text-center mb-5 pt-5">Clients <span>Feedbacks</span></h2>
            <div className="row feedbacks">
                {
                    data.map(data => {
                        return (
                            <>
                                {
                                    data.status == 'Approved' &&
                                    <div className="col-md-3 feedback">
                                        <div className="row clientInformation">
                                            <img className="col-3 img-fluid" src={client} alt="" />
                                            <div className="col-9 clientName">
                                                <h5>{data.name}</h5>
                                            </div>
                                        </div>
                                        <p>{data.description}</p>
                                    </div>
                                }
                            </>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Feedbacks;