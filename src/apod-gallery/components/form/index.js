import React, { Component } from 'react';
import './form.css';

class MyForm extends Component {
  createYearOptions = () => {
    const currYear = this.currentDate()[2];

    const options = [];

    for (let i = 1995; i <= currYear; i++) {
      if ((this.props.year === i)) {
        options.push(<option selected="selected" key={i} value={i}>{i}</option>);
      } else {
        options.push(<option key={i} value={i}>{i}</option>);
      }
    }
    return options;
  }

  createMonthOptions = () => {
    const currYear = this.currentDate()[2];
    const selectedYear = this.props.year;
    let maxMonth = 12;
    let minMonth = 1;

    if (selectedYear === currYear) {
      maxMonth = this.currentDate()[1]; //eslint-disable-line
    }

    if (selectedYear === 1995) {
      minMonth = 6;
    }

    const options = [];
    for (let i = minMonth; i <= maxMonth; i++) {
      if ((this.props.month === i)) {
        options.push(<option selected="selected" key={i} value={i}>{i}</option>);
      } else {
        options.push(<option key={i} value={i}>{i}</option>);
      }
    }
    return options;
  }

  createDayOptions = () => {
    const currYear = this.currentDate()[2];
    const currMonth = this.currentDate()[1];
    const selectedYear = this.props.year;
    const selectedMonth = this.props.month;
    let maxDay = 31;
    let minDay = 1;

    if ([4, 6, 9, 11].indexOf(selectedMonth) > -1) {
      maxDay = 30;
    } else if (selectedMonth === 2) {
      if ([1996, 2000, 2004, 2008, 2012, 2016, 2020, 2024, 2028].indexOf(selectedYear) > -1) {
        maxDay = 29;
      } else {
        maxDay = 28;
      }
    } else {
      maxDay = 31;
    }

    if (selectedYear === currYear) {
      if (selectedMonth === currMonth) {
        maxDay = this.currentDate()[0]; // eslint-disable-line
      }
    }

    if (selectedYear === 1995) {
      if (selectedMonth === 6) {
        minDay = 16;
      }
    }

    const options = [];
    for (let i = minDay; i <= maxDay; i++) {
      if ((this.props.year === 1995 && i === minDay) 
      || (this.props.year === currYear && i === maxDay)
        || (this.props.day === i)) {
        options.push(<option selected="selected" key={i} value={i}>{i}</option>);
      } else {
        options.push(<option key={i} value={i}>{i}</option>);
      }
    }
    return options;
  }

  currentDate = () => {
    const dateObj = new Date();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    return [day, month, year];
  }

  handleSelectChange = (event) => {
    const ValidatedDateRequest = (date) => {
      const newDate = date;
      const [
        currDay,
        currMonth,
        currYear,
      ] = this.currentDate();

      // Check for minimum year
      if (newDate[2] === 1995) {
        if (newDate[1] < 6) {
          // Set month to minimum month allowed
          newDate[1] = 6;
        } 
        if (newDate[0] < 16) {
          // Set day to minimum day allowed
          newDate[0] = 16;
        }
      }
      
      // Check for Maximum year based on current date
      if (newDate[2] === currYear && newDate[1] >= currMonth) {
        // Set month to max month allowed
        newDate[1] = currMonth;
        if (newDate[0] > currDay) {
          newDate[0] = currDay;
        }
      } 
      return newDate;
    };
    
    const { name, value } = event.target;

    const selectedDate = [this.props.day, this.props.month, this.props.year];

    if (name === 'day') {
      selectedDate[0] = parseInt(value, 10);
    } else if (name === 'month') {
      selectedDate[1] = parseInt(value, 10);
    } else {
      selectedDate[2] = parseInt(value, 10);
    }

    this.props.onComplete(ValidatedDateRequest(selectedDate));
  }


  render() {
    return (
      <div>
        <form
          id="planet-form"
          onSubmit={this.handleSubmit}
        >
          <label htmlFor="select-day">Day</label>
          <select
            key={100}
            id="select-day"
            name="day"
            onChange={this.handleSelectChange}
          >
            {this.createDayOptions()}
          </select>
          
          <label htmlFor="select-month">Month</label>
          <select
            key={200}
            id="select-month" 
            name="month"
            onChange={this.handleSelectChange}
            defaultValue={this.props.month}
          >
            {this.createMonthOptions()}
          </select>
          
          <label htmlFor="select-year">Year</label>
          <select
            key={300}
            id="select-year"
            name="year"
            onChange={this.handleSelectChange}
          >
            {this.createYearOptions()}
          </select>
        </form>
      </div>
    );
  }
}

export default MyForm;
