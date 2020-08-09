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
                {
                    // This is where I left off last
                    // pokeState.length > 0 && <div>
                        
                    //{currentPage}  {totalPages}
                        
                    // </div>
                }
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

