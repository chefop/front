import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

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
});

class ModalForm extends Component {
  state = {
    isOpen: false,
  };

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen } = this.state;
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
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={isOpen}
          onClose={this.handleClose}
        >
          <div
            className={classes.paper}
            style={{ margin: '0 auto', left: 0, right: 0, top: '25%' }}
          >
            <Typography variant="h6" gutterBottom>
              Ajouter un produit
            </Typography>
            <div>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Produit</FormLabel>
                <RadioGroup
                  aria-label="Produit"
                  name="produit"
                  className={classes.group}
                  value={this.state.value}
                  onChange={this.handleChange}
                >
                  <FormControlLabel
                    value="starter"
                    control={<Radio />}
                    label="Entrée"
                  />
                  <FormControlLabel
                    value="mainCourse"
                    control={<Radio />}
                    label="Plat"
                  />
                  <FormControlLabel
                    value="dessert"
                    control={<Radio />}
                    label="Dessert"
                  />
                  <FormControlLabel
                    value="drink"
                    control={<Radio />}
                    label="Boisson"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

ModalForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModalForm);
