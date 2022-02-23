import React from 'react';
import capitalize from '../helpers/capitalize';
import Box from '@mui/material/Box'

export default function CategoryHeader({business_type}){
    return (
        <Box sx={{paddingX:'2rem'}}>
      <Box
        sx={{
          borderBottom: "1px solid #757575",
          borderRadius: "3px",
          marginTop: "1rem",
        }}
      >
        <h1 style={{ textAlign: "center", color:'#757575' }}>Explore {capitalize(business_type)}</h1>
      </Box>
    </Box>
    )
}