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

const styles = (theme) => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
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

class DialogForm extends Component {
  state = {
    isOpen: false,
    productChoice: 'starter',
    bakingChoices: [],
    name: '',
    description: '',
    df_price: 0,
    vat: 0,
    quantity: 0,
    allergen: [],
    photo: '',
  };

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleBaking = (event) => {
    let value = event.target.value;
    const { bakingChoices } = this.state;
    const newBakingChoices = Array.from(bakingChoices);

    if (newBakingChoices.includes(value)) {
      bakingChoices.splice(bakingChoices.indexOf(value), 1);
      this.setState({
        bakingChoices: bakingChoices,
      });
    } else {
      bakingChoices.push(value);
      this.setState({
        bakingChoices: bakingChoices,
      });
    }
  };

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen, bakingChoices } = this.state;
    const { classes } = this.props;

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
          <DialogContent style={{ minWidth: 512 }}>
            <form
              className={classes.formContainer}
              noValidate
              autoComplete="off"
            >
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Type du produit</FormLabel>
                <RadioGroup
                  aria-label="Produit"
                  name="produit"
                  className={classes.group}
                  value={this.state.productChoice}
                  style={{ flexFlow: 'row' }}
                  onChange={this.handleChange('productChoice')}
                >
                  <FormControlLabel
                    value={PRODUCTS.STARTER}
                    control={<Radio color="primary" />}
                    label="Entrée"
                  />
                  <FormControlLabel
                    value={PRODUCTS.MAIN_COURSE}
                    control={<Radio color="primary" />}
                    label="Plat"
                  />
                  <FormControlLabel
                    value={PRODUCTS.DESSERT}
                    control={<Radio color="primary" />}
                    label="Dessert"
                  />
                  <FormControlLabel
                    value={PRODUCTS.DRINK}
                    control={<Radio color="primary" />}
                    label="Boisson"
                  />
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
              <FormLabel component="legend">Cuissons du produit</FormLabel>
              <FormGroup
                row
                aria-label="Cuisson"
                name="cuisson"
                className={classes.group}
                style={{ flexFlow: 'row' }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      value={BAKINGS.RARE}
                      onChange={this.handleBaking}
                      color="primary"
                      checked={bakingChoices.includes(BAKINGS.RARE)}
                    />
                  }
                  label="Bleu"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value={BAKINGS.MEDIUM}
                      onChange={this.handleBaking}
                      color="primary"
                      checked={bakingChoices.includes(BAKINGS.MEDIUM)}
                    />
                  }
                  label="Saignant"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value={BAKINGS.WELL_DONE}
                      onChange={this.handleBaking}
                      color="primary"
                      checked={bakingChoices.includes(BAKINGS.WELL_DONE)}
                    />
                  }
                  label="À point"
                />
              </FormGroup>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Annuler
            </Button>
            <Button
              onClick={this.handleClose}
              variant="contained"
              color="primary"
            >
              Ajouter
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

DialogForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DialogForm);
