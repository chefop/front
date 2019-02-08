import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import ProductsList from '../../components/ProductsList';
import { getStarters } from '../../store/ducks/starters/selectors';
import { getDesserts } from '../../store/ducks/desserts/selectors';
import { getMainCourses } from '../../store/ducks/mainCourses/selectors';
import { getDrinks } from '../../store/ducks/drinks/selectors';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

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
    const { classes, starters, mainCourses, desserts, drinks } = this.props;
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
        {value === 0 && <ProductsList products={starters} />}
        {value === 1 && <ProductsList products={mainCourses} />}
        {value === 2 && <ProductsList products={desserts} />}
        {value === 3 && <ProductsList products={drinks} />}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    starters: getStarters(state),
    mainCourses: getMainCourses(state),
    desserts: getDesserts(state),
    drinks: getDrinks(state),
  };
};

ProductTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(ProductTabs));
