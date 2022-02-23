import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Reviews from "./Reviews";
import BusinessOfferings from "./BusinessOfferings"
import BusinessInfo from "./BusinessInfo"





function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const tabs = {
    0: <Reviews />,
    1: <BusinessOfferings />,
    2: <BusinessInfo />,
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
          >
            <Tab label="Reviews" {...a11yProps(0)} />
            <Tab label="Offerings" {...a11yProps(1)} />
            <Tab label="Info" {...a11yProps(2)} />
          </Tabs>
        </Box>
        {/* <TabPanel value={value} index={0}>
          User Reviews
        </TabPanel>
        <TabPanel value={value} index={1}>
          Services
        </TabPanel>
        <TabPanel value={value} index={2}>
          Business Info
        </TabPanel> */}
      </Box>
      {tabs[value]}
    </div>
  );
}
