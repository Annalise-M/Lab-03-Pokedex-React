import React, { Component } from 'react'
import PokeItem from '../PokeItem.js';

export default class ListPage extends Component {
    render() {
        const {
            pokeState,
            // handleClickNext,
            // handleClickBack,
            // currentPage,
            // totalPages
        } = this.props;

        return (
            <div>
                {/* {
                    pokeState.length > 0 && <div>
                        
                    </div>
                } */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap'
                    }}>
                        {pokeState.map(pokemon => <PokeItem pokemon={pokemon} />)}
                    </div>
            </div>
        )
    }
}

