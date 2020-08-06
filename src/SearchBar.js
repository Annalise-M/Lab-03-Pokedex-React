import React, { Component } from 'react';
import request from 'superagent';
import './Styles.css';

export default class SearchBar extends Component {

    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.updateFilterData({
            isLoading: true,
        });

        const pokemonNameSearch = e.target.searchName.value,
            typeSearch = e.target.searchType.value,
            abilitiesSearch = e.target.searchAbilities.value,
            shapesSearch = e.target.searchShapes.value,
            data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?perPage=1000
            ${pokemonNameSearch ? '&pokemon=' + pokemonNameSearch : ''}
            ${typeSearch ? '&type=' + typeSearch : ''}
            ${abilitiesSearch ? '&abilities=' + abilitiesSearch : ''}
            ${pokemonNameSearch ? '&pokemon=' + pokemonNameSearch : ''}
            ${shapesSearch ? '&shapes=' + shapesSearch : ''}
            `);
        this.props.updateFilterData({
            filteredData: data.body.results,
            isLoading: false,
        });
    }
 
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <span>Search Name:</span>
                        <input onChange={this.pokemonNameSearch} name='searchName' />
                    </label>
                    {/* <img></img> */}
                    {/* put all the user types into this form */}
                    {/* url_image */}
                    <label>
                        <span>Search Type:</span>
                        <input name='typeSearch' />
                    </label>
                    <label>
                        <span>Search Abilities:</span>
                        <input name='abilitiesSearch' />
                    </label>
                    <label>
                        <span>Search Shapes:</span>
                        <input name='shapesSeach' />
                    </label>
                </form>
            </div>
                )    
            }
}

        

// must display Pokemon image: ex. url_image: "http://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png"
// must display Pokemon name: ex. pokemon: "venusaur",
// must display relevant data (attack, defence, anything you used in seach/sort) ex. type_1: / ability_hidden:


