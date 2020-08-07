import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Styles.css';

export default class PokeItem extends Component {

    render() {
        const { 
            pokemon: {pokemon}

    } = this.props;

        return (
            
            <Link to={`/detail/${pokemon}`}>
                <p>{this.props.pokemon.pokemon}</p>
                <img src={this.props.pokemon.url_image} alt={pokemon.pokemon} />
            </Link>
        )
    }
}

