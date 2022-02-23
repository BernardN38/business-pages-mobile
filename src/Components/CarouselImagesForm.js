import React from "react";
import {
  Typography,
  Box,
  Container,
  TextField,
  CssBaseline,
  Button,
} from "@mui/material";
import axios from 'axios';
import config from '../config';
import {useNavigate} from 'react-router-dom'
export default function CarouselImagesForm({ images, setImages, businessId }) {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target);
    setImages({image1:data.get('image1'), image2:data.get('image2'), image3:data.get('image3')})
    axios.post(`${config.serverUrl}/api/business/carousel`,data,{withCredentials:true}).then((resp)=>{
      if (resp.status === 200){
        navigate( `/business/${businessId}`)
      }
    })
  };
  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setImages({
      ...images,
      [name]:value
    })
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Edit Profile
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            onChange={handleChange}
            margin="normal"
            fullWidth
            id="image1"
            label="Image 1 Url"
            name="image1"
            value={images['image1']}
            autoFocus
          />
          <TextField
            onChange={handleChange}
            margin="normal"
            fullWidth
            id="image2"
            label="Image 2 Url"
            value={images['image2']}
            name="image2"
          />
          <TextField
            onChange={handleChange}
            margin="normal"
            fullWidth
            id="image3"
            label="Image 3 Url"
            value={images['image3']}
            name="image3"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
