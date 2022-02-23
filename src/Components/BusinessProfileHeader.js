import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import "../css/user-profile-header.css";
import { useSelector } from "react-redux";


function BusinessProfileHeader() {
  const [rating, setRating] = useState(0);
  const businessProfile = useSelector((state) => state.business.profile);
  useEffect(() => {
    let averageRating = 0;
    businessProfile.business_reviews.map((review) => {
      averageRating += review.rating;
    });
    if (businessProfile.business_reviews.length > 0) {
      setRating(averageRating / businessProfile.business_reviews.length);
    }
  }, []);
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      marginTop={1}
      bgcolor="paper.secondary"
      width={"100%"}
    >
      <Card sx={{ width: "90%" }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding={1}
        >
          <Avatar
            sx={{ height: "120px", width: "120px" }}
            src={businessProfile.profile_image_url}
          />
        </Box>
        {/* <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            {capitalize(businessProfile.name)}
          </Typography>
        </CardContent> */}
        <Stack direction="row">
          <div className="user-header-badge">
            Reviews: {businessProfile.business_reviews.length}
          </div>
          <div className="user-header-badge">Average Rating {Math.round(rating * 100) / 100}</div>
          <div className="user-header-badge"></div>
        </Stack>
      </Card>
    </Box>
  );
}
export default BusinessProfileHeader;
