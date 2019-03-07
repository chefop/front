import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
  DeveloperBoard,
  Fastfood,
  Assignment,
  TrendingUp,
  AirlineSeatReclineNormal,
} from '@material-ui/icons';
import Header from '../components/Header';
import SUB_VIEWS from '../constants/constSubViews';
import VIEWS from '../constants/constViews';
import ProductTabs from '../components/ProductTabs';
import Order from './customer/Order';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchDesserts } from '../store/ducks/desserts';
import { fetchDrinks } from '../store/ducks/drinks';
import { fetchMainCourses } from '../store/ducks/mainCourses';
import { fetchStarters } from '../store/ducks/starters';

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

const { CARTE, MENUS, COMMANDE } = SUB_VIEWS;

class Customer extends Component {
  state = {
    view: CARTE,
    products: [],
  };

  changeView = (newView) => {
    this.setState({ view: newView });
  };

  componentDidMount() {
    fetchStarters.request();
  }

  handleAddProduct = (product) => {
    this.setState((prevState) => {
      return { products: [...prevState.products, product] };
    });
  };

  handleDeleteProduct = (product, positionToRemove) => {
    this.setState((prevState) => {
      return {
        products: prevState.products.filter(
          (element, index) => index !== positionToRemove,
        ),
      };
    });
  };

  render() {
    const { classes } = this.props;
    const { view, products } = this.state;

    return (
      <div className={classes.root}>
        <Header title={'Client'}>
          <List>
            {[
              { text: 'Carte', view: CARTE },
              // { text: 'Menus', view: MENUS },
              { text: 'Commande', view: COMMANDE },
            ].map(({ text, view }) => (
              <ListItem button key={text} onClick={() => this.changeView(view)}>
                <ListItemIcon>
                  {view === CARTE ? (
                    <Fastfood />
                  ) : view === MENUS ? (
                    <DeveloperBoard />
                  ) : (
                    <Assignment />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Header>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {view === CARTE ? (
            <ProductTabs
              caller={VIEWS.CUSTOMER}
              handleAddProduct={this.handleAddProduct}
            />
          ) : view === MENUS ? (
            ''
          ) : (
            <Order
              products={products}
              handleDeleteProduct={this.handleDeleteProduct}
            />
          )}
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchStarters: fetchStarters.request,
      fetchMainCourses: fetchMainCourses.request,
      fetchDesserts: fetchDesserts.request,
      fetchDrinks: fetchDrinks.request,
    },
    dispatch,
  );
};

Customer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(Customer));
