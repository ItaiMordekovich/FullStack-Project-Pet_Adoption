import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoginSignupModal from "../Auth/LoginSignupModal";
import LoginSignupButton from "./LoginSignupButton";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PetsIcon from '@mui/icons-material/Pets';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from "react-redux";


export default function Navbar() {
  
  let [open, setOpen] = useState(false);
  let [openModal, setOpenModal] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function toggleModal() {
    setOpenModal((openModal = !openModal));
  }

  return (
    <React.Fragment>
      <div>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar className="header-toolbar">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <LoginSignupButton toggleModal={toggleModal}></LoginSignupButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="persistent" anchor="left" open={open}>
          <div>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button>
              <Link to="/" className="navbar-link">
                <ListItemIcon>
                  <HomeIcon color="primary"/>
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </Link>
            </ListItem>
            <ListItem button>
              <Link to="/SearchPage" className="navbar-link">
                <ListItemIcon>
                  <SearchIcon color="primary"/>
                </ListItemIcon>
                <ListItemText primary={"Search"} />
              </Link>
            </ListItem>
            <ListItem button>
              <Link to="/PetsPage" className="navbar-link">
                <ListItemIcon>
                  <PetsIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={"Pets"} />
              </Link>
            </ListItem>
            <ListItem button>
              <Link to="/MyPetsPage" className="navbar-link">
                <ListItemIcon>
                  <FavoriteIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={"My Pets"} />
              </Link>
            </ListItem>
            <ListItem button>
              <Link to="/ProfileSettings" className="navbar-link">
                <ListItemIcon>
                  <ManageAccountsIcon color="primary"/>
                </ListItemIcon>
                <ListItemText primary={"Profile Settings"} />
              </Link>
            </ListItem>
          </List>
          <Divider />
        </Drawer>
        <main>
        </main>
      </div>
      <LoginSignupModal
        toggleModal={toggleModal}
        openModal={openModal}
      ></LoginSignupModal>
    </React.Fragment>
  );
}
