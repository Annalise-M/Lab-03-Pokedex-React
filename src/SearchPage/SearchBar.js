import React, { Component } from 'react';
import request from 'superagent';
import PokeItem from '../PokeItem.js';

export default class SearchBar extends Component {
    state = { 
        search: '',
        searchBy: 'pokemon',
        isLoading: false,
        pokeState: []
    }
        
    handleClick = async () => {

        this.setState({ isLoading: true })

        const data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?perPage=1000&${this.state.searchBy}=${this.state.search}`);

        this.setState({
            pokeState: data.body.results,
            isLoading: false
        })}
        render(){
            
            return (
                <div>
                    <input onChange={(e) => this.setState({ search: e.target.value })} />
                    <select onChange={(e) => { this.setState({ searchBy: e.target.value })} }>
                        <option value='pokemon'>Name</option>
                        <option value='type'>Type</option>
                        <option value='shapes'>Shapes</option>
                        <option value='ability_1'>Ability</option>
                        <option value='ability_hidden'>Hidden Ability</option>
                    </select>
                    <button onClick={this.handleClick}>Fetch Pokemon!</button>
                    {
                        this.state.isLoading
                        ? <p>Loading</p>
                        : this.state.pokeState.map(poke => <PokeItem pokemon={poke} />)
                    }
                </div>
            )
                
        };
    
}
 
