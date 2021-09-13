import React, { useState } from 'react';
import './Connect.css'
import { useForm } from "react-hook-form";

const Connect = () => {
    const [success,setSuccess] = useState('');

    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = (data) => {
        fetch('http://localhost:8000/connect',{
            method:'POST',
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
            },
            body:JSON.stringify(data)
        })
        .then(res => res.json())
        .then(() => {
            setSuccess('Successfully sended')
            document.querySelector('.connect form').reset();
        })
    }
    return (
        <div id="connect" className="row connectMain" >
            <div className="col-md-4 content">
                <h2>Let handle your project,professionally</h2>
                <p>With well written codes.we build amazing apps for all platforms.mobile and web apps is general.</p>
            </div>
            <div className="col-md-5 connect">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input placeholder="Name" type="text" {...register("name", { required: true})} />
                    <p className="text-center text-danger error">{errors.name?.type === 'required' && "Name is required"}</p>

                    <input placeholder="Email" type="text" {...register("email", { required: true})} />
                    <p className="text-center text-danger error">{errors.email?.type === 'required' && "Email is required"}</p>

                    <textarea name="sms" placeholder="Your message" name="" id="" cols="30" rows="10" {...register("sms", { required: true })}></textarea>
                    <p className="text-center text-danger error">{errors.sms?.type === 'required' && "Massage is required"}</p>
                    <p className="error text-center text-success">{success != '' && success}</p>
                    <input className="button btn" value="Send" type="submit" />
                </form>
            </div>  
        </div>
    );
};

export default Connect;