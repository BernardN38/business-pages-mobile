import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import BuildIcon from "@mui/icons-material/Build";
import Typography from "@mui/material/Typography";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import {useNavigate} from 'react-router-dom';

export default function BusinessCategories() {
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate(`/category/${e.currentTarget.value}`)
  };
  return (
    <div>
      <Stack direction="row" justifyContent="space-evenly" alignItems="center">
        <Box sx={{ justifyContent: "center" }}>
          <Button value="food" onClick={handleClick}>
            <Stack justifyContent="center" alignItems="center">
              <RestaurantIcon style={{ fontSize: 60 }} />
              <Typography variant="subtitle2" align="center">
                Food
              </Typography>
            </Stack>
          </Button>
        </Box>

        <Box sx={{ justifyContent: "center" }} >
          <Button value="automotive" onClick={handleClick}>
            <Stack justifyContent="center" alignItems="center">
              <BuildIcon style={{ fontSize: 60 }} />
              <Typography variant="subtitle2" align="center">
                AutoMotive
              </Typography>
            </Stack>
          </Button>
        </Box>

        <Box sx={{ justifyContent: "center" }} value="phoneRepair">
          <Button value="phone_repair" onClick={handleClick}>
            <Stack justifyContent="center" alignItems="center">
              <PhoneIphoneIcon style={{ fontSize: 63 }} />
              <Typography variant="subtitle2" align="center">
                Phone Repair
              </Typography>
            </Stack>
          </Button>
        </Box>

        <Box sx={{ justifyContent: "center" }}>
          <Button value="home_repair" onClick={handleClick}>
            <Stack justifyContent="center" alignItems="center">
              <HomeRepairServiceIcon style={{ fontSize: 60 }} />
              <Typography variant="subtitle2" align="center">
                Home Repair
              </Typography>
            </Stack>
          </Button>
        </Box>
      </Stack>
    </div>
  );
}
