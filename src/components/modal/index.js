import React, { Component, Fragment } from 'react';
import PreviousSlider from '../previous-slider';
import NextSlider from '../next-slider';
import CloseButton from '../close-button';

class Modal extends Component {
  componentDidMount() {
    import('./modal.css');
  }
  render() {
    const errorJSX = (
      <Fragment>
        <h2>{this.props.error}</h2>
        <CloseButton closeModal={this.props.closeModal} />
      </Fragment>
    );

    const galleryJSX = (
      <Fragment>
        <PreviousSlider handlePreviousImg={this.props.handlePreviousImg} />
        <article>
          <h4>{this.props.data.title} - {this.props.data.date}</h4>
          <img
            className="modal-img"
            src={this.props.data.hdurl}
            alt={this.props.text}
          />
        </article>
        <NextSlider handleNextImg={this.props.handleNextImg} />
        <CloseButton closeModal={this.props.closeModal} />
      </Fragment>      
    );

    return (
      <div className="modal">
        {this.props.error ? errorJSX : galleryJSX}
      </div>
    );
  }
}

export default Modal;
