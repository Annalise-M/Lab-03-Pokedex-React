import React, { Component } from 'react';
import '../Styles.css';
import request from 'superagent';


export default class DetailPage extends Component {
    state = { pokemon: null }

    

    componentDidMount = async () => {
        const name = this.props.match.params.myPokemonId;

        const data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?pokemon=${name}`);

        console.log(data);
        const pokemon = data.body.results[0];
        this.setState({ pokemon: pokemon })
    }

    render() {
        const { pokemon } = this.state;

        return (
            <div>
                {
                    pokemon
                        && <div>
                            <img src={pokemon.url_image} alt={pokemon.pokemon} />
                            <p>Name: {pokemon.pokemon}</p>
                            <p>Type: {pokemon.type_1}</p>
                            <p>Shape: {pokemon.shape}</p>
                            <p>Ability: {pokemon.ability_1}</p>
                            <p>Hidden Ability: {pokemon.ability_hidden}</p>
                        </div>
                }
            </div>
        )
    }
}


