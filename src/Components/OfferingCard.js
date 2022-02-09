import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import Stack from "@mui/material/Stack";
function OfferingCard({title,price,url,description}) {
  return (
    <Card className='border border-dark m-1'>
      <CardMedia
        component="img"
        height={150}
        image="https://media.istockphoto.com/photos/fresh-homemade-pizza-margherita-picture-id1278998606?s=612x612"
      />
      <CardContent>
        <Stack direction="row" className="d-flex align-items-center justify-content-between">
          <Typography variant="h5" component="div" className='mr-5'>
            12" Pizza
          </Typography>

          <Badge color="secondary" badgeContent={0}>
            $12.99
          </Badge>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          Delicious 12 inch pizza with your choice of toppings.
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

export default OfferingCard;
