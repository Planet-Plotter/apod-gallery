import React, { Component } from 'react';
import superagent from 'superagent';

// import TableOne from '../table';
import Modal from '../modal';
import Form from '../form';
import PreviousSlider from '../previous-slider';
import NextSlider from '../next-slider';
import './apod-gallery.css';


class App extends Component {
  // babel-preset - stage - 2 includes class features that implicitly bind to the instance
  // This means no need for a constructor or props here
  state = {
    data: [],
    modalIsOpen: false,
    day: 16,
    month: 6,
    year: 1995,
  };

  componentDidMount = () => {
    this.handleSubmit([this.state.day, this.state.month, this.state.year]);
  }

  requestPlanetData = (queryUrl) => {
    superagent.get(queryUrl)
      .then(response => {
        this.setState({
          data: response.body[0],
          error: '',
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          modalIsOpen: true,
          error: 'Oh no! No APOD image exists for this date. Please select another date or go to the next image.',
        });
      });
  }

  handleSubmit = (values) => {
    console.log(values);
    let [
      day,
      month,
      year,
    ] = values;

    this.setState({
      day,
      month,
      year,
    });

    // Conversion for proper url API requirements in case day and month are less than 2 digits
    day = day.toString();
    month = month.toString();
    year = year.toString();

    if (day.length < 2) day = `0${day}`;
    if (month.length < 2) month = `0${month}`;

    // TODO: ADD function to set localStorage to save user's selected date

    const url = `https://api.nasa.gov/planetary/apod?api_key=UpQHlODpCJ11wBVTPjtMqf9FZ8JS64dbO4MsV2Sa&start_date=${year}-${month}-${day}&end_date=${year}-${month}-${day}`;

    this.requestPlanetData(url);
  }

  handlePreviousImg = () => {
    let {
      month,
      year,
    } = this.state;

    let previousDay = this.state.day - 1;

    // Logic to Check for proper day decrement
    if (previousDay === 0) {
      if (month === 2 + 1) {
        month--;
        if (!([1996, 2000, 2004, 2008, 2012, 2016, 2020, 2024, 2028].indexOf(year) > -1)) {
          previousDay = 28;
        } else {
          previousDay = 29;
        }
      } else if (month === 1) {
        previousDay = 31;
        month = 12;
        year--;
      // Adding 1 month as we are working backwards
      } else if ([4 + 1, 6 + 1, 9 + 1, 11 + 1].indexOf(month) > -1) {
        previousDay = 30;
        month--;
      } else {
        previousDay = 31;
        month--;
      }
    }

    this.handleSubmit([previousDay, month, year]);
  }

  handleNextImg = () => {
    let {
      month,
      year,
    } = this.state;

    let nextDay = this.state.day + 1;

    // Logic to Check for proper day advancement
    if (month === 2) {
      if (nextDay === 29) {
        if (!([1996, 2000, 2004, 2008, 2012, 2016, 2020, 2024, 2028].indexOf(year) > -1)) {
          nextDay = 1;
          month++;
        }
      } else if (nextDay === 30) {
        nextDay = 1;
        month++;
      }
    } else if (nextDay === 31) {
      if ([4, 6, 9, 11].indexOf(month) > -1) {
        nextDay = 1;
        month++;
      }
    } else if (nextDay === 32) {
      nextDay = 1;
      if (month === 12) {
        month = 1;
        year++;
      } else {
        month++;
      }
    }

    this.handleSubmit([nextDay, month, year]);
  }

  toggleModal = () => {
    if (this.state.modalIsOpen) {
      this.setState({
        modalIsOpen: false,
      });
    } else {
      this.setState({
        modalIsOpen: true,
      });
    }
  }

  openHDImg = () => {
    window.open(this.state.data.hdurl, '_blank');
  }

  render() {
    const {
      data, 
    } = this.state;

    const errorJSX = (<div id="apod-error"> {this.state.error} </div>);

    let url, //eslint-disable-line
      title, 
      explanation = null;

    if (data) {
      url = data.url; //eslint-disable-line
      title = data.title; //eslint-disable-line
      explanation = data.explanation;//eslint-disable-line
    }
    return (
      <div className="apod-gallery">
        <header>
          <h1> Astronomy Picture of the Day</h1>
        </header>
        <main>
          <div id="apod-img-navigation">
            <Form
              day={this.state.day}
              month={this.state.month}
              year={this.state.year}
              onComplete={this.handleSubmit}
            />
          </div>            

          {/* TODO: ADD conditonal to have a loading bar if image is loading, else display image */}
          <div id="apod-img-container">
            {this.state.error ? errorJSX : (
              <img //eslint-disable-line
                src={url}
                alt={title}
                onClick={this.openHDImg}
              />)}
            <footer id="apod-top-footer">
              <PreviousSlider handlePreviousImg={this.handlePreviousImg} />
              <p>{title}</p>
              <NextSlider handleNextImg={this.handleNextImg} />
            </footer>
            <footer id="apod-bottom-footer">
              <svg id="apod-expand-svg" viewBox="0 0 32 32">
                <path d="M32 0h-13l5 5-6 6 3 3 6-6 5 5z" />
                <path d="M32 32v-13l-5 5-6-6-3 3 6 6-5 5z" />
                <path d="M0 32h13l-5-5 6-6-3-3-6 6-5-5z" />
                <path d="M0 0v13l5-5 6 6 3-3-6-6 5-5z" />
              </svg>
              <svg id="apod-share-svg" viewBox="0 0 32 32">
                <path d="M27 22c-1.411 0-2.685 0.586-3.594 1.526l-13.469-6.734c0.041-0.258 0.063-0.522 0.063-0.791s-0.022-0.534-0.063-0.791l13.469-6.734c0.909 0.94 2.183 1.526 3.594 1.526 2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5c0 0.269 0.022 0.534 0.063 0.791l-13.469 6.734c-0.909-0.94-2.183-1.526-3.594-1.526-2.761 0-5 2.239-5 5s2.239 5 5 5c1.411 0 2.685-0.586 3.594-1.526l13.469 6.734c-0.041 0.258-0.063 0.522-0.063 0.791 0 2.761 2.239 5 5 5s5-2.239 5-5c0-2.761-2.239-5-5-5z" />
              </svg>
            </footer>
          </div>
          <p>{explanation}</p>
          {/* { this.state.modalIsOpen ? 
            <Modal
              isOpen={this.state.modalIsOpen}
              data={this.state.data}
              error={this.state.error}
              closeModal={this.toggleModal}
              handleNextImg={this.handleNextImg}
              handlePreviousImg={this.handlePreviousImg}
          /> : null } */}
        </main>       
      </div>
    );
  }
}

export default App;
