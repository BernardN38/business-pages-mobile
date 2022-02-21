import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import "../css/user-profile-header.css";

function UserProfileHeader({ userData, rank }) {
  console.log(userData)
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
            sx={{ height: "70px", width: "70px" }}
            src={userData.profile_image_url}
          />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            {userData.username}
          </Typography>
        </CardContent>
        <Stack direction="row">
          <div className="user-header-badge">Score: {userData.score}</div>
          <div className="user-header-badge">
            Reviews: {userData.reviews.length}
          </div>
          <div className="user-header-badge">Rank: {rank}</div>
        </Stack>
      </Card>
    </Box>
  );
}
export default UserProfileHeader;
