import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import StartersList from '../../components/StartersList';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class ProductTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <>
        <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Entrées" />
            <Tab label="Plats" />
            <Tab label="Desserts" />
            <Tab label="Boissons" />
          </Tabs>
        </Paper>
        {value === 0 && <StartersList />}
      </>
    );
  }
}

ProductTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductTabs);
