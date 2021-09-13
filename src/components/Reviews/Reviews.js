import React from 'react';
import SideBar from '../SideBar/SideBar';
import './Reviews.css'
import { useForm } from "react-hook-form";
import { useState } from 'react';

const Reviews = () => {
    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = (data) => {
        fetch('http://localhost:8000/review',{
            method:'POST',
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
            },
            body:JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            setError('')
            setSuccess('successfully sended')
            document.querySelector('.mainReview form').reset()
        })
        .catch(err => {   
            setSuccess('')
            setError('something went wrong.')
        })
    }
    return (
        <div className="row reviews" >
            <SideBar></SideBar>
            <div className="col-9 reviewsBody">
                <div className="dashboardHeader">
                    <h5>Reviews</h5>
                    <h6>Pro Rasel</h6>
                </div>
                <div className="mainReview">
                    <form onSubmit={handleSubmit(onSubmit)} action="">
                        <input placeholder="Name" type="text" {...register("name", { required: true })} />
                        <p className="text-center text-danger error">{errors.name?.type === 'required' && "Name is required"}</p>
                        
                        <input placeholder="Email" type="text" {...register("email", { required: true })} />
                        <p className="text-center text-danger error">{errors.email?.type === 'required' && "Email is required"}</p>
                        
                        <textarea placeholder="Description" name="" id="" rows="4" {...register("description", { required: true })}></textarea>
                        <p className="text-center text-danger error">{errors.description?.type === 'required' && "Description is required"}</p>

                        <p className="text-center error text-danger">{error != '' && error}</p>
                        <p className="text-center error text-success">{success != '' && success}</p>

                        <input className="button btn send" type="submit" placeholder="Send" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Reviews;