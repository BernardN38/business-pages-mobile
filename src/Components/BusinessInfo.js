import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";

import { useSelector } from "react-redux";



function BuinessInfo() {
  const business = useSelector((state) => state.business.business);
  const [dense, setDense] = React.useState(false);
  const listItems = [];
  for (let [key, val] of Object.entries(business)) {
    const fields = ["name", "description", "address", "phone_number"];
    console.log(key);
    if (fields.includes(key)) {
      listItems.push(
        <ListItem>
          <ListItemText key={key} primary={key} secondary={val} />
        </ListItem>
      );
    }
  }
  console.log(listItems);
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid item xs={12} md={6}>
        <List dense={dense}>
          {listItems.map((el) => {
            return el;
          })}
        </List>
      </Grid>
    </Box>
  );
}

export default BuinessInfo;
