import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
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
    margin: '0 auto',
    marginTop: theme.spacing.unit * 2,
    display: 'inline-block',
  },
});

function Home(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Typography component="h1" variant="h1" className={classes.title}>
        Chef'op
      </Typography>
      <div className={classes.root}>
        <Link to={ROUTES.BOARD} className={classes.link}>
          <Button variant="contained" size="large" color="primary">
            Op, op !
          </Button>
        </Link>
      </div>
    </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
