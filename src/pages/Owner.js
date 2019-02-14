import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
  DeveloperBoard,
  Fastfood,
  AirlineSeatReclineNormal,
  TrendingUp,
} from '@material-ui/icons';
import Header from '../components/Header';
import List from '@material-ui/core/List';
import ProductTabs from '../components/ProductTabs';
import { fetchStarters } from '../store/ducks/starters';
import VIEWS from '../constants/constViews';
import ModalForm from './owner/ModalForm';

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

const { MENUS, CARTE, COMMANDES, TABLES } = VIEWS;

class Owner extends Component {
  state = {
    view: MENUS,
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
      <>
        <div className={classes.root}>
          <Header title={'Gérant'}>
            <List>
              {[
                { text: 'Commandes', view: COMMANDES },
                { text: 'Tables', view: TABLES },
                { text: 'Menus', view: MENUS },
                { text: 'Carte', view: CARTE },
              ].map(({ text, view }, index) => (
                <ListItem
                  button
                  key={text}
                  onClick={() => this.changeView(view)}
                >
                  <ListItemIcon>
                    {index === 0 ? (
                      <TrendingUp />
                    ) : index === 1 ? (
                      <AirlineSeatReclineNormal />
                    ) : index === 2 ? (
                      <DeveloperBoard />
                    ) : (
                      <Fastfood />
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
              <>
                <ProductTabs caller={VIEWS.OWNER} />
                <ModalForm />
              </>
            ) : view === MENUS ? (
              ''
            ) : view === TABLES ? (
              ''
            ) : (
              ''
            )}
          </main>
        </div>
      </>
    );
  }
}

Owner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Owner);
