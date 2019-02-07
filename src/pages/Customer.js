import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { DeveloperBoard, Fastfood, Assignment } from '@material-ui/icons';
import Header from '../components/Header';
import { fetchStarters } from '../store/ducks/starters';
import ProductTabs from '../components/products/ProductTabs';

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

const MENU = 'MENU';
const CARTE = 'CARTE';
const COMMANDE = 'COMMANDE';

class Customer extends Component {
  state = {
    view: CARTE,
  };

  changeView = (newView) => {
    this.setState({ view: newView });
  };

  componentDidMount() {
    fetchStarters.request();
  }

  render() {
    const { classes } = this.props;
    const { view } = this.state;

    return (
      <div className={classes.root}>
        <Header title={'Client'}>
          <List>
            {[
              { text: 'Carte', view: CARTE },
              { text: 'Menus', view: MENU },
              { text: 'Commande', view: COMMANDE },
            ].map(({ text, view }, index) => (
              <ListItem button key={text} onClick={() => this.changeView(view)}>
                <ListItemIcon>
                  {index === 0 ? (
                    <Fastfood />
                  ) : index === 1 ? (
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
          {view === CARTE ? <ProductTabs /> : view === MENU ? '' : ''}
        </main>
      </div>
    );
  }
}

Customer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Customer);
