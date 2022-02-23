import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import capitalize from '../helpers/capitalize'
import { useSelector } from "react-redux";

function BuinessInfo() {
  const business = useSelector((state) => state.business.business);
  const listItems = [];
  for (let [key, val] of Object.entries(business)) {
    const fields = ["name", "description", "address", "phone_number"];

    if (fields.includes(key)) {
      listItems.push(
        <ListItem key={key}>
          <ListItemText primary={capitalize(key)} secondary={val} />
        </ListItem>
      );
    }
  }

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid item xs={12} md={6}>
        <List dense={false}>
          {listItems.map((el) => {
            return el;
          })}
        </List>
      </Grid>
    </Box>
  );
}

export default BuinessInfo;
