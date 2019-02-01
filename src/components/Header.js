import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import ROUTES from '../constants/constRoutes';

const drawerWidth = 240;

const styles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  grow: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
});

const Header = (props) => {
  const { children, classes, title } = props;

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.grow}
          >
            {title}
          </Typography>
          <Button color="inherit">
            <Link to={ROUTES.LOGIN}>Quitter</Link>
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        {children}
      </Drawer>
    </>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(Header);
