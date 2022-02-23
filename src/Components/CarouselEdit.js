import React, {useState, useEffect} from 'react';
import ControlledCarousel from './Carousel';
import CarouselImagesForm from './CarouselImagesForm';
import axios from 'axios';
import {useSelector} from 'react-redux'
import config from '../config';

export default function CarouselEdit(){
    const [images,setImages] = useState({image1:'',image2:'',image3:''})
    const business = useSelector((state) => state.business.profile);
    useEffect(()=>{
        axios.get(`${config.serverUrl}/api/business/${business.business_id}/carousel`).then((resp)=>{
            setImages({image1:resp.data[0].image_url,image2:resp.data[1].image_url,image3:resp.data[2].image_url})
        })
    },[])
    return (
        <div>
            <ControlledCarousel carouselImages={Object.values(images)}/>
            <CarouselImagesForm images={images} setImages={setImages} businessId={business.business_id}/>
        </div>
    )
}