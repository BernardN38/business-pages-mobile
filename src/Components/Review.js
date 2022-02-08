import * as React from 'react';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from "@mui/material/Rating";
// const bull = (
//   <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//   >
//     •
//   </Box>
// );

export default function Review({reviewBody, username}) {
  return (
    <div className="p-2">
    <Card sx={{ minWidth: 275 }} className="border border-dark">
      <CardContent>
        <Typography style={{fontWeight: "bold"}} sx={{ fontSize: 14 }} color="text.dark" gutterBottom>
          Great Experience!
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Username: {username}
        </Typography>
        <Rating name="read-only" value={Math.floor(Math.random()*5)} readOnly />
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {reviewBody}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Reply</Button>
      </CardActions>
    </Card>
    </div>
  );
}