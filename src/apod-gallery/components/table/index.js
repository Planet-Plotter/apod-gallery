import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class TableOne extends Component {
  render() {
    const data = [{
      name: 'Tanner Linsley',
      age: 26,
      friend: {
        name: 'Jason Maurer',
        age: 23,
      },
    },
    {
      name: 'Test Linsley',
      age: 26,
      friend: {
        name: 'Test Maurer',
        age: 23,
      },
    },
    {
      name: 'Tanner WEEE',
      age: 26,
      friend: {
        name: 'WEE Maurer',
        age: 23,
      },
    }];

    const columns = [{
      Header: 'Name',
      accessor: 'name',
    }, {
      Header: 'Age',
      accessor: 'age',
      Cell: props => <span className="number">{props.value}</span>, // Custom cell components!
    }, {
      id: 'friendName', // Required because our accessor is not a string
      Header: 'Friend Name',
      accessor: d => d.friend.name, // Custom value accessors!
    }, {
      Header: props => <span>Friend Age</span>, // Custom header components!
      accessor: 'friend.age',
    }];

    return (
      <ReactTable
        data={data}
        columns={columns}
        defaultPageSize={10}
      />
    );
  }
}

export default TableOne;
