import React, { Component } from 'react';
import superagent from 'superagent';
import Form from '../form';
import PreviousSlider from '../previous-slider';
import NextSlider from '../next-slider';
import './apod-gallery.css';
import HDViewButton from '../hd-view-button';


class App extends Component {
  // babel-preset - stage - 2 includes class features that implicitly bind to the instance
  // This means no need for a constructor or props here
  state = {
    data: [],
    day: 16,
    month: 6,
    year: 1995,
  };

  componentDidMount = () => {
    this.handleSubmit([this.state.day, this.state.month, this.state.year]);
  }

  currentDate = () => {
    const dateObj = new Date();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    return [day, month, year];
  }

  requestPlanetData = (queryUrl) => {
    superagent.get(queryUrl)
      .then(response => {
        if (response.body[0].media_type === 'video') {
          this.setState({
            error: `Video Not supported at this time. \n View it here: ${response.body[0].url}`,
            data: response.body[0],
          });
        } else {
          this.setState({
            data: response.body[0],
            error: '',
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
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

    // CHeck if submitted date is NEWER than current Date
    const currDate = this.currentDate();
    if (year === currDate[2] && month === currDate[1] && day >= currDate[0]) {
      this.setState({
        currentDateReached: true,
        firstDateReached: false,
      });
    } else if (year === 1995 && month === 6 && day <= 16) {
      console.log('hit first day check');
      this.setState({
        currentDateReached: false,
        firstDateReached: true,
      });
    } else {
      this.setState({
        currentDateReached: false,
        firstDateReached: false,
      });
    }
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
              currentDate={this.currentDate}
            />
          </div>            

          {/* TODO: ADD conditonal to have a loading bar if image is loading, else display image */}

          <div id="apod-img-container">
            {this.state.error ? errorJSX : (
              <img //eslint-disable-line
                src={url}
                alt={title}
              />)}
            <footer id="apod-top-footer">
              <PreviousSlider
                id="apod-previous-button"
                handlePreviousImg={this.handlePreviousImg}
                hide={this.state.firstDateReached ? 'apod-hide' : null}
              />
              <p>{title}</p>
              <NextSlider
                id="apod-next-button"
                handleNextImg={this.handleNextImg}
                hide={this.state.currentDateReached ? 'apod-hide' : null}
              />
            </footer>
            {this.state.error ? null : (
              <footer id="apod-bottom-footer">
                <HDViewButton
                  id="apod-hd-button" 
                  openHDImg={this.openHDImg}
                />

                {/* TODO: ADD button and svg for sharing image */}
              </footer>
            )}
          </div>
          <p>{explanation}</p>
        </main>       
      </div>
    );
  }
}

export default App;
