import React, { Component } from 'react';

class NextSlider extends Component {
  render() {
    return (
      <button
        id={this.props.id}
        className={this.props.hide ? this.props.hide : null}
        onClick={this.props.handleNextImg}
      >
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 200">
          <line x1="0" y1="0" x2="100" y2="100" stroke="black" strokeLinecap="square" />
          <line x1="100" y1="100" x2="0" y2="200" stroke="black" strokeLinecap="square" />
        </svg>
      </button>
    );
  }
}

export default NextSlider;
