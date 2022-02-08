import React, {useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

function Services() {
  const [servicesList, setServicesList] = useState([{category: "food", subCategories:["nachos","hot cheetos with cheese","elote","pizza"]}])
  return <div>
      <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {servicesList.map((service) => (
        <li key={`section-${service.category}`}>
          <ul>
            <ListSubheader>{`${service.category}`}</ListSubheader>
            {service.subCategories.map((item) => (
              <ListItem key={`item-${service.category}-${item}`}>
                <ListItemText primary={`${item}`} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  </div>;
}

export default Services;
