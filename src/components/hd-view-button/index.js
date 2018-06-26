import React, { Component } from 'react';

class HDViewButton extends Component {
  render() {
    return (
      <button
        id={this.props.id}
        onClick={this.props.openHDImg}
      >
        <svg id="apod-expand-svg" viewBox="0 0 32 32">
          <path d="M32 0h-13l5 5-6 6 3 3 6-6 5 5z" />
          <path d="M32 32v-13l-5 5-6-6-3 3 6 6-5 5z" />
          <path d="M0 32h13l-5-5 6-6-3-3-6 6-5-5z" />
          <path d="M0 0v13l5-5 6 6 3-3-6-6 5-5z" />
        </svg>
      </button>
    );
  }
}

export default HDViewButton;
