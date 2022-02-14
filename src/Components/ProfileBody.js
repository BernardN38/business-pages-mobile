import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import UserMessages from './UserMessages';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {Link} from 'react-router-dom'
export default function ProfileBody() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', marginTop:1 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton component={Link} to='/profile/edit'>
        <ListItemIcon>
          <ModeEditIcon />
        </ListItemIcon>
        <ListItemText primary="Edit Profile" />
      </ListItemButton>
      {/* <ListItemButton>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Place holder" />
      </ListItemButton> */}
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <UserMessages/>
      </Collapse>
    </List>
  );
    }