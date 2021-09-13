import React from 'react';
import './Services.css';
import service1 from '../image/icons/service1.png'
import service2 from '../image/icons/service2.png'
import service3 from '../image/icons/service3.png'

const Services = () => {
    const hire = () => {
        window.location.replace('placeOrder')
    }
    return (
        <div className="servicesMain">
            <h2 className="text-center mb-5" >Provide awesome <span>services</span></h2>
            <div className="row col-md-10 mt-5 m-auto services">
                <div onClick={hire} className="col-md-3 service">
                    <img src={service1} alt="" />
                    <h4>Web & Mobile design</h4>
                    <p>We craft stunning and amazing web Ul.using a well drafted UX to fit your project</p>
                </div>
                <div onClick={hire} className="col-md-3 service">
                    <img src={service2} alt="" />
                    <h4>Graphic design</h4>
                    <p>Amazing flyers,social media post and brand representations that would make your brand stand out.</p>
                </div>
                <div onClick={hire} className="col-md-3 service">
                    <img src={service3} alt="" />
                    <h4>Web development</h4>
                    <p>With will written codes.we build amazing apps for all platforms.mobile and web apps general.</p>
                </div> 
            </div>
        </div>
    );
};

export default Services;