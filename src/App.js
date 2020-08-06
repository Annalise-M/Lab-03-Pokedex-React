import React from 'react';
import './Styles.css';
import request from 'superagent';
// import SearchBar from './PokemonData.js';

// need to create in put for userSearchParams DONE
// need to add a seach-Button DONE
// need to add/connect pokedex data to site DONE

// need to add drop down category as another seachParam option

class App extends React.Component {
  state = { 
    search: '',
    isLoading: false,
    pokeState: []
  }

  handleClick = async () => {
    this.setState({ isLoading: true })
    const data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?perPage=1000&pokemon=${this.state.search}`);

    this.setState({ 
      pokeState: data.body.results,
      isLoading: false,
     })
  }

  handleDogType = (e) => {
    const type = e.target.value;

    this.setState({ filter: type })
  }
  render() {
    return (
        <header>
          <input onChange={(e) => this.setState({ search: e.target.value})} />
          <button onClick={this.handleClick}>Fetch Pokemon!</button>
          {
            this.state.isLoading 
              ? <p>LOADING</p> 
              //name type ability shape
              : this.state.pokeState.map(poke => <p>Name: {poke.pokemon} Type: { poke.type_1 } Ability: { poke.ability_1 } Shape: { poke.shape } {<img className='poke-box' src={poke.url_image} alt='fart-face' />}</p>)
          } 
        </header>
    );
  }
}

export default App;


//inputs into state and log out
//change api call per the user choices saved int state
//display everything from API call to display on the page

