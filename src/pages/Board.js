import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ROUTES from '../constants/constRoutes';

const styles = (theme) => ({
  root: {
    width: '100%',
    textAlign: 'center',
  },
  title: {
    margin: '0 auto',
    textAlign: 'center',
    marginTop: '40vh',
  },
  link: {
    textDecoration: 'none',
    marginTop: theme.spacing.unit * 2,
    margin: theme.spacing.unit,
    display: 'inline-block',
  },
});

function Board(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Link to={ROUTES.OWNER} className={classes.link}>
        <Button variant="contained" size="large" color="primary">
          Gérant
        </Button>
      </Link>
      <Link to={ROUTES.CUSTOMER} className={classes.link}>
        <Button variant="contained" size="large" color="primary">
          Client
        </Button>
      </Link>
    </div>
  );
}

Board.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Board);
