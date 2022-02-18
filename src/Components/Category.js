import React, {useEffect} from 'react';
import axios from 'axios';
import BusinessHeader from './BusinessHeader';
import config from '../config';

export default function Category({type='food'}){
    useEffect(()=>{
        axios.get(`${config.serverUrl}/api/business?type=${type}`).then((resp)=>{
            console.log(resp)
        })
    })
    return (
        <div>
            {/* <BusinessHeader/> */}
            businessheader
        </div>
    )
}