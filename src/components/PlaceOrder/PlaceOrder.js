import React from 'react';
import SideBar from '../SideBar/SideBar';
import './PlaceOrder.css'
import { useForm } from "react-hook-form";
import { useState } from 'react';
const PlaceOrder = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = (data) => {
        if (file == null) {
            setError('something went wrong.please try again.')
        } else {
            setError('')
            const user = JSON.parse(sessionStorage.getItem('user'))
            const formData = new FormData()
            formData.append('myFile', file)
            formData.append('name', data.name)
            formData.append('email', data.email)
            formData.append('projectName', data.projectName)
            formData.append('details', data.details)
            formData.append('price', data.price)
            formData.append('userEmail', user.email)

            fetch('http://localhost:8000/placeOrder', {
                method: 'POST',
                body:formData
            })
                .then(response => response.json())
                .then(data => {
                    setError('')
                    setSuccess('placed order successfully')
                    document.querySelector('.order form').reset();
                })
                .catch(error => {
                    setSuccess('')
                    setError('something went wrong.please try again.')
                })

        }
    }

    const addFile = (e) => {
        setFile(e.target.files[0])
    }
    return (
        <div className="row placeOrder">
            <SideBar></SideBar>
            <div className="col-9 orderBody">
                <div className="dashboardHeader">
                    <h5>Order</h5>
                    <h6>Pro Rasel</h6>
                </div>
                <div className="order">
                    <form onSubmit={handleSubmit(onSubmit)} action="">
                        <input placeholder="Name" type="text" {...register("name", { required: true })} />
                        <p className="text-center text-danger error">{errors.name?.type === 'required' && "Name is required"}</p>

                        <input placeholder="Email" type="text" {...register("email", { required: true })} />
                        <p className="text-center text-danger error">{errors.email?.type === 'required' && "Email is required"}</p>

                        <input placeholder="Project Name" type="text" {...register("projectName", { required: true })} />
                        <p className="text-center text-danger error">{errors.projectName?.type === 'required' && "Project name is required"}</p>

                        <textarea placeholder="Project details" name="" id="" rows="4" {...register("details", { required: true })}></textarea>
                        <p className="text-center text-danger error">{errors.details?.type === 'required' && "Project details is required"}</p>

                        <div className="priceAndUpload">
                            <div className="first">
                                <input placeholder="Price" type="text" {...register("price", { required: true })} />
                                <p className="text-center text-danger error">{errors.price?.type === 'required' && "Name is required"}</p>
                            </div>

                            <input onChange={addFile} type="file" />
                        </div>
                        <p className="text-center text-danger error">{error != '' && error}</p>
                        <p className="text-center text-success error">{success != '' && success}</p>
                        <input className="button btn send" type="submit" placeholder="Send" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;