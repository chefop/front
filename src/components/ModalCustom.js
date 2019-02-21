import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

class ModalCustom extends Component {
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
    const { classes, title, content, buttonText } = this.props;

    return (
      <>
        <Button onClick={this.handleOpen}>{buttonText}</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.isOpen}
          onClose={this.handleClose}
        >
          <div
            className={classes.paper}
            style={{ margin: '0 auto', left: 0, right: 0, top: '25%' }}
          >
            <Typography variant="h6" id="modal-title">
              {title}
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              {content}
            </Typography>
          </div>
        </Modal>
      </>
    );
  }
}

ModalCustom.propTypes = {
  buttonText: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
};

export default withStyles(styles)(ModalCustom);
