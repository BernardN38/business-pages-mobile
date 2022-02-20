import React from 'react';
import { Typography } from '@mui/material';
import capitalize from '../helpers/capitalize';


export default function CategoryHeader({business_type}){
    return (
        <div>
            <Typography align='center'  sx={{fontSize:"2rem"}}>Explore {business_type} category</Typography>
        </div>
    )
}