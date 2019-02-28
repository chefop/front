import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import ProductCard from './ProductCard';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
});

class ProductsList extends Component {
  render() {
    const { products, classes, caller, handleAddProduct } = this.props;

    return (
      <div style={{ marginTop: 24 }}>
        <Grid container spacing={24} className={classes.root} direction="row">
          {products.map(
            (
              {
                photo,
                name,
                description,
                df_price,
                vat,
                quantity,
                allergen,
                _id,
              },
              index,
            ) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <ProductCard
                    photo={photo}
                    name={name}
                    description={description}
                    df_price={df_price}
                    vat={vat}
                    quantity={quantity}
                    allergen={allergen}
                    _id={_id}
                    caller={caller}
                    handleAddProduct={handleAddProduct}
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

ProductsList.propTypes = {
  classes: PropTypes.object.isRequired,
  expanded: PropTypes.oneOf([PropTypes.string, false, null]),
  caller: PropTypes.string.isRequired,
  handleAddProduct: PropTypes.func,
};

export default withStyles(styles)(ProductsList);
