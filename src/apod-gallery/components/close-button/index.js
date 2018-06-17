import React, { Component } from 'react';

class CloseButton extends Component {
  render() {
    return (
      <button
        className="modal-button modal-close"
        onClick={this.props.closeModal}
      >
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 200 200">
          <line x1="0" y1="0" x2="200" y2="200" stroke="black" strokeLinecap="square" />
          <line x1="200" y1="0" x2="0" y2="200" stroke="black" strokeLinecap="square" />
        </svg>
      </button>
    );
  }
}

export default CloseButton;
