import React from 'react';
import SideBar from '../SideBar/SideBar';
import './AddAdmin.css'
import { useForm } from "react-hook-form";
import { useState } from 'react';

const AddAdmin = () => {
    const [success,setSuccess] = useState('')
    const [error,setError] = useState('')

    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = (data) => {
        fetch('http://localhost:8000/addAdmin',{
            method:'POST',
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
            },
            body:JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            setError('')
            setSuccess('admin added successfully')
            document.querySelector('.add form').reset()
        })
        .catch(err => {
            setSuccess('')
            setError('something went wrong.please try again.')
        })
    }
    return (
        <div className="row addAdmin" >
            <SideBar></SideBar>
            <div className="col-9 addAdminBody">
                <div className="dashboardHeader">
                    <h5>Service List</h5>
                    <h6>Pro Rasel</h6>
                </div>
                <div className="add">
                    <form onSubmit={handleSubmit(onSubmit)} action="">
                        <input placeholder="Email" type="text" {...register("email", { required: true })} />
                        <p className="text-center text-danger error">{errors.email?.type === 'required' && "Email is required"}</p>

                        <input placeholder="Password" type="password" {...register("password", { required: true })} />
                        <p className="text-center text-danger error">{errors.password?.type === 'required' && "Password is required"}</p>

                        <p className="text-center text-danger error">{error != '' && error}</p>
                        <p className="text-center text-success error">{success != '' && success}</p>

                        <input className="button btn" type="submit" value="Add" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAdmin;