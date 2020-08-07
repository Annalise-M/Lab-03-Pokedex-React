import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
} from 'react-router-dom';
import SearchBar from './SearchPage/SearchBar.js';
import DetailPage from './DetailPage/DetailPage.js';
import './Styles/Styles.css';

export default class Header extends Component {
    render() {
        return (
            <div>
                <Router>
                    <header>
                        <p><Link to="/">Home</Link></p>
                        <p><Link to="/detail">Detail</Link></p>
                    </header>
                    <Switch>
                <Route
                    path="/" 
                    exact
                    render={(routerProps) => <SearchBar {...routerProps} />} 
                />
                <Route 
                    path="/detail/:myPokemonId" 
                    exact
                    render={(routerProps) => <DetailPage {...routerProps} />} 
                />
                    </Switch>
                </Router>
            </div>
        )
    }
}

