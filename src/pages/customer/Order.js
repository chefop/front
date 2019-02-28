import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import { priceEuros } from '../../utils/priceHelper';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing.unit * 2,
  },
});

class Order extends Component {
  render() {
    const { classes, products, handleDeleteProduct } = this.props;
    let totalPrice = 0;

    for (let product of products) {
      totalPrice += parseFloat(product.price);
    }

    return (
      <Paper className={classes.root}>
        {products.length > 0 ? (
          <>
            <List>
              {products.map((product, index) => (
                <ListItem key={index}>
                  <ListItemText primary={product.name} />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => handleDeleteProduct(product, index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <Typography variant="h3" noWrap className={classes.padding}>
              {priceEuros(totalPrice)}
            </Typography>
          </>
        ) : (
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.padding}
          >
            Votre commande est vide
          </Typography>
        )}
      </Paper>
    );
  }
}

Order.propTypes = {
  classes: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
};

export default withStyles(styles)(Order);
