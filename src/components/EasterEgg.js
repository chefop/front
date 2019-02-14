import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core';

const Easter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 5px;
  height: 5px;
`;

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

class EasterEgg extends Component {
  state = {
    isOpen: false,
    isCtrlPressed: false,
  };

  resetStates = () => {
    this.setState({ isCtrlPressed: false, isOpen: false });
  };

  openModal = () => {
    const { isCtrlPressed } = this.state;

    if (isCtrlPressed) {
      this.setState({ isOpen: true });
    }
  };

  keyUp = () => {
    this.setState({ isCtrlPressed: false });
  };

  keyDown = (event) => {
    if (event.keyCode === 17) {
      this.setState({ isCtrlPressed: true });
    } else {
      this.resetStates();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.keyDown, false);
    document.addEventListener('keyup', this.keyUp, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDown, false);
    document.removeEventListener('keyup', this.keyUp, false);
  }

  render() {
    const { isOpen } = this.state;
    const { classes } = this.props;

    return (
      <>
        <Easter onMouseEnter={this.openModal} />
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={isOpen}
          onClose={this.resetStates}
        >
          <div
            className={classes.paper}
            style={{ margin: '0 auto', left: 0, right: 0, top: '25%' }}
          >
            <img
              style={{ width: '100%' }}
              src="https://media.giphy.com/media/3P0sH1unGUinC/giphy.gif"
              alt="Gif"
            />
          </div>
        </Modal>
      </>
    );
  }
}

EasterEgg.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EasterEgg);
