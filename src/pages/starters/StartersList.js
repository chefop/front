import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { getStarters } from '../../store/ducks/starters/selectors';
import Grid from '@material-ui/core/Grid';
import ProductCard from '../../components/products/ProductCard';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
});

class StartersList extends Component {
  render() {
    const { starters, classes } = this.props;

    return (
      <div style={{ marginTop: 24 }}>
        <Grid
          container
          spacing={24}
          className={classes.root}
          direction="row"
          justify="space-between"
        >
          {starters.map(
            (
              { photo, name, description, dfPrice, vat, quantity, allergen },
              index,
            ) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <ProductCard
                    photo={photo}
                    name={name}
                    description={description}
                    dfPrice={dfPrice}
                    vat={vat}
                    quantity={quantity}
                    allergen={allergen}
                  />
                </Grid>
              );
            },
          )}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    starters: getStarters(state),
  };
};

StartersList.propTypes = {
  classes: PropTypes.object.isRequired,
  expanded: PropTypes.oneOf([PropTypes.string, false, null]),
};

export default connect(mapStateToProps)(withStyles(styles)(StartersList));
