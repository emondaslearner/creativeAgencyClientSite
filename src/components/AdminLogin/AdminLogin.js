import React from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import './AdminLogin.css'

const AdminLogin = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = (data) => {
        fetch('http://localhost:8000/adminLogin', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.information == 'success') {
                    setError('')
                    setSuccess('login successfully')
                    sessionStorage.setItem('admin', data.token)
                    window.location.replace('/serviceList')
                } else {
                    setSuccess('')
                    setError('information is not valid')
                }
            })
            .catch(err => {
                setSuccess('')
                setError('information is not valid')
            })
    }
    return (
        <div className="AdminLogin">
            <form onSubmit={handleSubmit(onSubmit)} action="">
                <p className="text-center text-danger error">{error != '' && error}</p>
                <p className="text-center text-success error">{success != '' && success}</p>
                <input placeholder="Email" type="text" {...register("email", { required: true })} />
                <p className="text-center text-danger error">{errors.email?.type === 'required' && "Email is required"}</p>

                <input placeholder="Password" type="password" {...register("password", { required: true })} />
                <p className="text-center text-danger error">{errors.password?.type === 'required' && "Password is required"}</p>

                <input className="button btn" type="submit" value="Add" />
            </form>
        </div>
    );
};

export default AdminLogin;