import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";



export default function Narbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const authMode = useSelector((state)=> state.auth.authMode)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h7"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { sm: "block" } }}
        >
          Business Pages
        </Typography>
        {/* <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search> */}
      </Toolbar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem component={Link} to="/" onClick={handleClose}>
          Home
        </MenuItem>
        {authMode==='user' ? <MenuItem
            component={Link}
            to="/profile"
            onClick={handleClose}
          >
            My account
          </MenuItem>: ''}
          {authMode==='business' ? <MenuItem
            component={Link}
            to="/profile/business"
            onClick={handleClose}
          >
            My account
          </MenuItem>: ''}
        <MenuItem component={Link} to="/login" onClick={handleClose}>
          Login
        </MenuItem>
        {/* {user.token ? (
          <MenuItem component={Link} to="/logout" onClick={handleClose}>
            Logout
          </MenuItem>
        ) : (
          <MenuItem component={Link} to="/login" onClick={handleClose}>
            Login
          </MenuItem>
        )} */}
      </Menu>
    </AppBar>
  );
}
