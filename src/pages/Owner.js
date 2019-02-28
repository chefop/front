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
import { fetchMainCourses } from '../store/ducks/mainCourses';
import { fetchDesserts } from '../store/ducks/desserts';
import { fetchDrinks } from '../store/ducks/drinks';
import DialogForm from './owner/DialogForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import VIEWS from '../constants/constViews';
import SUB_VIEWS from '../constants/constSubViews';

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

const { MENUS, CARTE, COMMANDES, TABLES } = SUB_VIEWS;

class Owner extends Component {
  state = {
    view: CARTE,
  };

  changeView = (newView) => {
    this.setState({ view: newView });
  };

  componentDidMount() {
    const {
      fetchStarters,
      fetchMainCourses,
      fetchDesserts,
      fetchDrinks,
    } = this.props;

    fetchStarters();
    fetchMainCourses();
    fetchDesserts();
    fetchDrinks();
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
                // { text: 'Commandes', view: COMMANDES },
                // { text: 'Tables', view: TABLES },
                // { text: 'Menus', view: MENUS },
                { text: 'Carte', view: CARTE },
              ].map(({ text, view }) => (
                <ListItem
                  button
                  key={text}
                  onClick={() => this.changeView(view)}
                >
                  <ListItemIcon>
                    {view === COMMANDES ? (
                      <TrendingUp />
                    ) : view === TABLES ? (
                      <AirlineSeatReclineNormal />
                    ) : view === MENUS ? (
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
                <DialogForm />
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

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(Owner));
