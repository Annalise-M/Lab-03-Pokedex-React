import React, { Component } from 'react';
// import SearchBar from './SearchPage/SearchBar.js';
// import DetailPage from './DetailPage/DetailPage.js';
import Header from './Header.js';
import './Styles/Styles.css';


export default class App extends Component {
  render() {
    return (
      <>
        <div>
            <Header />
        </div>
        </>
    )
  }
}

//inputs into state and log out
//change api call per the user choices saved into state
//display everything from API call to display on the page

