import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import PRODUCTS from '../../constants/constProducts';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import MenuItem from '@material-ui/core/MenuItem';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import BAKINGS from '../../constants/constBakings';
import { connect } from 'react-redux';
import { addStarter } from '../../store/ducks/starters';
import { addMainCourse } from '../../store/ducks/mainCourses';
import { addDessert } from '../../store/ducks/desserts';
import { addDrink } from '../../store/ducks/drinks';
import {
  isNotEmpty,
  isSuperiorOrEqualToZero,
  isSuperiorToZero,
} from '../../utils/validationsHelper';
import { red } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import VOLUMES from '../../constants/constVolumes';
import Switch from '@material-ui/core/Switch';
import { bindActionCreators } from 'redux';
import { getAllergens } from '../../store/ducks/allergens/selectors';

const styles = (theme) => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  alert: {
    backgroundColor: red[50],
    margin: `0 ${theme.spacing.unit * 3}px`,
    borderRadius: theme.spacing.unit,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  red: {
    color: red[500],
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  formContainer: {
    display: 'flex',
    flexFlow: 'column',
  },
  formControl: {
    marginTop: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
});

const vatRate = [
  {
    value: '5.5',
    label: '5,5 %',
  },
  {
    value: '10',
    label: '10 %',
  },
  {
    value: '20',
    label: '20 %',
  },
];

const initialState = {
  isOpen: false,
  hasError: false,
  productChoice: PRODUCTS.STARTER,
  bakingChoices: [],
  name: '',
  description: '',
  df_price: 0,
  vat: vatRate[2].value,
  quantity: 0,
  allergen: [],
  photo: '',
  volumeChoices: [],
  alcohol: false,
  cold_drink: false,
  allergenChoices: [],
};

class DialogForm extends Component {
  state = initialState;

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleBoolean = (name) => (event) => {
    this.setState({
      [name]: !this.state[name],
    });
  };

  handleArray = (name) => (event) => {
    let value = event.target.value;
    const actualArray = this.state[name];

    const newArray = Array.from(actualArray);

    if (newArray.includes(value)) {
      actualArray.splice(actualArray.indexOf(value), 1);
      this.setState({
        [name]: actualArray,
      });
    } else {
      actualArray.push(value);
      this.setState({
        [name]: actualArray,
      });
    }
  };

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { addStarter, addMainCourse, addDessert, addDrink } = this.props;

    const {
      productChoice,
      bakingChoices,
      name,
      description,
      df_price,
      vat,
      quantity,
      photo,
      volumeChoices,
      alcohol,
      cold_drink,
      allergenChoices,
    } = this.state;

    if (
      isNotEmpty([name, description, photo]) &&
      isSuperiorToZero([quantity]) &&
      isSuperiorOrEqualToZero([vat, df_price])
    ) {
      ({
        [PRODUCTS.STARTER]: () => {
          return addStarter({
            name,
            description,
            df_price,
            vat,
            quantity,
            allergen: allergenChoices,
            photo,
          });
        },
        [PRODUCTS.MAIN_COURSE]: () => {
          return addMainCourse({
            name,
            description,
            df_price,
            vat,
            baking: bakingChoices,
            quantity,
            allergen: allergenChoices,
            photo,
          });
        },
        [PRODUCTS.DESSERT]: () => {
          return addDessert({
            name,
            description,
            df_price,
            vat,
            quantity,
            allergen: allergenChoices,
            photo,
          });
        },
        [PRODUCTS.DRINK]: () => {
          return addDrink({
            name,
            description,
            df_price,
            vat,
            quantity,
            allergen: allergenChoices,
            photo,
            alcohol,
            volume: volumeChoices,
            cold_drink,
          });
        },
      }[productChoice]());

      this.setState(initialState);
      this.handleClose();
    } else {
      this.setState({ hasError: true });
    }
  };

  render() {
    const {
      isOpen,
      bakingChoices,
      hasError,
      productChoice,
      alcohol,
      cold_drink,
      volumeChoices,
      allergenChoices,
    } = this.state;
    const { classes, allergens } = this.props;

    return (
      <>
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          onClick={this.handleOpen}
        >
          <AddIcon />
        </Fab>
        <Dialog
          open={isOpen}
          scroll="paper"
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Ajouter un produit</DialogTitle>
          {hasError && (
            <div className={classes.alert}>
              <Typography
                variant="subtitle1"
                component="h4"
                className={classes.red}
              >
                Veuillez remplir ou corriger les champs.
              </Typography>
            </div>
          )}
          <DialogContent style={{ minWidth: 512 }}>
            <form
              className={classes.formContainer}
              noValidate
              autoComplete="off"
              onSubmit={this.handleSubmit}
            >
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Type du produit</FormLabel>
                <RadioGroup
                  aria-label="Produit"
                  name="produit"
                  value={productChoice}
                  className={classes.group}
                  style={{ flexFlow: 'row' }}
                  onChange={this.handleChange('productChoice')}
                >
                  {Object.keys(PRODUCTS).map((key, index) => {
                    const value = PRODUCTS[key];

                    return (
                      <FormControlLabel
                        key={index}
                        value={value}
                        control={<Radio color="primary" />}
                        label={value}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
              <TextField
                id="outlined-name"
                label="Nom"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-description"
                label="Description"
                multiline
                rows="4"
                rowsMax="4"
                value={this.state.description}
                onChange={this.handleChange('description')}
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-df_price"
                label="Prix HT"
                value={this.state.df_price}
                onChange={this.handleChange('df_price')}
                type="number"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                min={0}
              />
              <TextField
                id="outlined-select-tva"
                select
                label="TVA"
                className={classes.textField}
                value={this.state.vat}
                onChange={this.handleChange('vat')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Sélectionner votre taux de TVA"
                margin="normal"
                variant="outlined"
              >
                {vatRate.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-quantity"
                label="Quantité"
                value={this.state.quantity}
                onChange={this.handleChange('quantity')}
                type="number"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                min={0}
              />
              <TextField
                id="outlined-photo"
                label="Photo"
                value={this.state.photo}
                onChange={this.handleChange('photo')}
                type="text"
                className={classes.textField}
                margin="normal"
                helperText="Lien de la photo"
                variant="outlined"
              />
              {productChoice === PRODUCTS.MAIN_COURSE && (
                <>
                  <FormLabel component="legend" style={{ marginTop: 8 }}>
                    Cuissons du produit
                  </FormLabel>
                  <FormGroup
                    row
                    aria-label="Cuisson"
                    className={classes.group}
                    style={{ flexFlow: 'row' }}
                  >
                    {Object.keys(BAKINGS).map((key, index) => {
                      const value = BAKINGS[key];

                      return (
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              value={value}
                              onChange={this.handleArray('bakingChoices')}
                              color="primary"
                              checked={bakingChoices.includes(value)}
                            />
                          }
                          label={value}
                        />
                      );
                    })}
                  </FormGroup>
                </>
              )}
              {productChoice === PRODUCTS.DRINK && (
                <>
                  <FormLabel component="legend" style={{ marginTop: 8 }}>
                    Volume de la boisson
                  </FormLabel>
                  <FormGroup
                    row
                    aria-label="Boisson alcoolisée"
                    className={classes.group}
                    style={{ flexFlow: 'row' }}
                  >
                    {Object.keys(VOLUMES).map((key, index) => {
                      const value = VOLUMES[key];

                      return (
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              value={value}
                              onChange={this.handleArray('volumeChoices')}
                              color="primary"
                              checked={volumeChoices.includes(value)}
                            />
                          }
                          label={value}
                        />
                      );
                    })}
                  </FormGroup>
                  <FormGroup
                    row
                    aria-label="Boisson alcoolisée"
                    className={classes.group}
                    style={{ flexFlow: 'row' }}
                  >
                    <FormControlLabel
                      control={
                        <Switch
                          value="alcohol"
                          onChange={this.handleBoolean('alcohol')}
                          checked={alcohol}
                        />
                      }
                      label="Boisson alcoolisée ?"
                    />
                  </FormGroup>
                  <FormGroup
                    row
                    aria-label="Boisson froide ?"
                    className={classes.group}
                    style={{ flexFlow: 'row' }}
                  >
                    <FormControlLabel
                      control={
                        <Switch
                          value="cold_drink"
                          onChange={this.handleBoolean('cold_drink')}
                          checked={cold_drink}
                        />
                      }
                      label="Boisson froide ?"
                    />
                  </FormGroup>
                </>
              )}
              <FormLabel component="legend" style={{ marginTop: 8 }}>
                Allergènes
              </FormLabel>
              <FormGroup
                row
                aria-label="Allergènes"
                className={classes.group}
                style={{ flexFlow: 'row' }}
              >
                {Object.keys(allergens).map((key, index) => {
                  const value = allergens[key];

                  return (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          value={value.name}
                          onChange={this.handleArray('allergenChoices')}
                          color="primary"
                          checked={allergenChoices.includes(value.name)}
                        />
                      }
                      label={value.name}
                    />
                  );
                })}
              </FormGroup>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Annuler
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Ajouter
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

// TODO : Get bakings

const mapStateToProps = (state) => {
  return {
    allergens: getAllergens(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addStarter: addStarter.request,
      addMainCourse: addMainCourse.request,
      addDessert: addDessert.request,
      addDrink: addDrink.request,
    },
    dispatch,
  );
};

DialogForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(DialogForm));
