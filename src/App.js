import React from 'react';
import './Styles.css';
import request from 'superagent';

// need to create in put for userSearchParams
// need to add a seach-Button
// need to add/connect pokedex data to site
// need to add drop down category as another seachParam option

// must display Pokemon image: ex. url_image: "http://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png"
// must display Pokemon name: ex. pokemon: "venusaur",
// must display relevant data (attack, defence, anything you used in seach/sort) ex. type_1: / ability_hidden:

class App extends React.Component {
  state = {
    search: '',
    isLoading: false,
    pokeState: []
  }

  handleClick = async () => {
    this.setState({ isLoading: true})
    const data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?perPage=1000&pokemon=${this.state.search}`);

    this.setState({
      pokeState: data.body.results,
      isLoading: false,
    })
  }

  handlePokemonType = (e) => {
    const type = e.target.value;

    this.setState({ filter: type })
  }

  render() {
    return (
      <>
        <header className={this.state.newColor}>

          <input onChange={(e) => this.setState({ search: e.target.validationMessage })} />
          <button onClick={this.handleClick}>Inspect Pokedex!</button>
          {/* will put / */}
          {/* {handleDropDown
            this.state.isLoading

          } */}
        </header>

        <body>welcome</body>
      </>
    );
  }
}

export default App;

