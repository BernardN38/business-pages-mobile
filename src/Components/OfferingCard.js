import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
function OfferingCard({offering}) {
  const {name,price,image_url,description} = offering;
  
  return (
    <Card className='border border-dark m-1'>
      <CardMedia
        component="img"
        height={180}
        image={image_url}
      />
      <CardContent>
        <Stack direction="row" className="d-flex align-items-center justify-content-between">
          <Typography variant="h5" component="div" className='mr-5'>
            {name}
          </Typography>

          <Badge color="secondary" badgeContent={0}>
            ${price}
          </Badge>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {description}
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
