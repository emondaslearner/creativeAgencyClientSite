import React, { useEffect, useState } from 'react';
import './Portfolio.css'
import carousel1 from '../image/carousel-1.png'
import carousel2 from '../image/carousel-2.png'
import carousel3 from '../image/carousel-3.png'
import carousel4 from '../image/carousel-4.png'
import carousel5 from '../image/carousel-5.png'
import carousel6 from '../image/carousel-6.png'
import carousel7 from '../image/carousel-7.png'
import carousel8 from '../image/carousel-8.png'
import carousel9 from '../image/carousel-9.png'

const Portfolio = () => {

    //count slider margin
    const [count,setCount] = useState(-30);

    //count slide number
    const [countSlide,setCountSlide] = useState(0);

    //count windowScreenWidth
    const [windowScreenWidth,setWindowScreenWidth] = useState(0)

    //change slider status on hover
    const [trues,setTrues] = useState(false)



    //slide the slider in every 6 secondes
    useEffect(() => {
        document.querySelector('.portfolioMain .portfolio img').style.marginLeft = `-${count}px`;
    },[count])



    //increase number in every 6 secondes
    useEffect(() => {
        const multipliedWidth = window.screen.width;
        let intervalID;
        if(trues == false){
            intervalID = setInterval(() => {
                setCount(prevCount => (prevCount + multipliedWidth - 70));
            },6000);
        }
        return () => clearInterval(intervalID);

    }, [trues]);



    useEffect(() => {

        //set window screen and slideImg number
        const allImg = document.querySelectorAll('.portfolio img');

        let slideImgCount = 3;
        setCountSlide(allImg.length / slideImgCount);
        if(window.innerWidth < 868){
            slideImgCount = 2
            setCountSlide(Math.ceil(allImg.length / slideImgCount));
        }
        if(window.innerWidth < 534){
            slideImgCount = 1
            setCountSlide((allImg.length / slideImgCount) - 1);
        }
        setWindowScreenWidth(window.screen.width);

        //margin 0 after finish img 
        const sliderWidth = windowScreenWidth * (countSlide - 1);
        if(count > sliderWidth) {
            setCount(-30)
            document.querySelector('.portfolioMain .portfolio img').style.marginLeft = `30px`;
        }
    },[count])



    //setPoint count
    const pointCount = [];
    for(let i = 0;i < countSlide;i++){
        pointCount.push(i)
    }


    //active first point on reload page
    useEffect(() => {
        setTimeout(() => {
            if(count == -30){
                document.querySelectorAll('.point a')[0].classList.add('active')
            } 
        },500)
    },[count])
    

    //change point active class when change slide
    useEffect(() => {
        const proWidth = windowScreenWidth * (countSlide - 1);
        if(count < proWidth){
            const pointActive = Math.ceil(count/windowScreenWidth);
            const point = document.querySelectorAll('.point a');
            for(let i = 0;i < countSlide;i++){
                point[i].classList.remove('active')
                point[i].classList.add('disActive')
            }
            if(pointActive > 0){
                point[pointActive].classList.add('active')
            }
            if(pointActive == -0){
                point[0].classList.add('active')
            }   
        }
    },[count])


    //set active class in point
    const manualSlide = (e) => {
        e.preventDefault();

        //here have a problem when slider user in mobile.so thats condition have written for responsive
        if(window.innerWidth < 534){
            setCount((windowScreenWidth) * e.target.id)
        }else{
            setCount((windowScreenWidth - 100) * e.target.id)
        }

        //change active class on change slide
        for(let i = 0;i < countSlide;i++){
            document.querySelectorAll('.point a')[i].classList.remove('active');
        }
        e.target.classList.add('active');
    }


    return (
        <div id="portfolio" className="portfolioMain" >
            <h2 className="text-center mb-5 pt-5 text-white">Here are some of <span>our works</span></h2>
            <div className="portfolio">
                <img src={carousel1} alt="" />
                <img src={carousel2} alt="" />
                <img src={carousel3} alt="" />
                <img src={carousel4} alt="" />
                <img src={carousel5} alt="" />
                <img src={carousel6} alt="" />
                <img src={carousel7} alt="" />
                <img src={carousel8} alt="" />
                <img src={carousel9} alt="" />
            </div>
            <div className="point">
                {
                    pointCount.map(point => {
                        return(
                            <a id={point} onMouseUp={() => setTrues(false)} onMouseDown={() => setTrues(true)} onClick={manualSlide} href=""></a>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Portfolio;