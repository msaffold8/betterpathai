import React from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, Box, IconButton, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
// import MobileNav from "./mobile-nav.js";
import { AccountPopover } from "./account-popover.js";
import { NotificationsPopover } from "./notifications-popover.js";
import { OrganizationPopover } from "./organization-popover.js";

const TopNav = ({ onMobileNavOpen }) => {
  const handleMobileNavOpen = () => {
    if (onMobileNavOpen) {
      onMobileNavOpen();
    }
  };

  return (
    <AppBar>
      <Toolbar>
        <IconButton color="inherit" onClick={handleMobileNavOpen}>
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit">
          <Badge
            badgeContent={4} // Adjust as needed
            color="error"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        {/* Render other components */}
        <NotificationsPopover />
        <OrganizationPopover />
        <AccountPopover />
      </Toolbar>
    </AppBar>
  );
};

TopNav.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

export default TopNav;
