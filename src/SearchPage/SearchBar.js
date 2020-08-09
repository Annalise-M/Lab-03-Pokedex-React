import React, { Component } from 'react';
import request from 'superagent';
import ListPage from '../ListPage/ListPage.js';

export default class SearchBar extends Component {
    state = { 
        search: '',
        searchBy: 'pokemon',
        isLoading: false,
        pokeState: [],
        currentPage: 1,
        totalPages: 1,
        counter: 0
    }

    componentDidMount = async () => {
        const params = new URLSearchParams(this.props.location.search);

        const searchBy = params.get('searchBy');
        const page = params.get('page');
        const search = params.get('search');

        if (searchBy && page && search) {
            await this.setState({
                searchBy: searchBy,
                currentPage: page,
                search: search
            });
        }
        await this.makeRequest()
    }
    
    makeRequest = async () => {
        this.setState({ isLoading: true });
            

        const data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?page=${this.state.currentPage}&perPage=20&${this.state.searchBy}=${this.state.search}`);

        this.setState({
            pokeState: data.body.results,
            totalPages: Math.ceil(data.body.count / 20),
            isLoading: false,
        })

        const params = new URLSearchParams(this.props.location.search);

        params.set('search', this.state.seach);
        params.set('searchBy', this.state.seachBy);
        params.set('page', this.state.currentPage);

        this.props.history.push('?' + params.toString())
    }


    handleClickNext = async () => {
        console.log(this.state.counter);

        await this.setState({ currentPage: Number(this.state.currentPage) + 1 })

        this.setState({
            counter: this.state.counter + 1,
        })
        
        await this.makeRequest();
    }


    handleClickBack = async () => {
        console.log(this.state.counter);
        await this.setState({ currentPage: Number(this.state.currentPage) - 1 })
        
        this.setState({
            counter: this.state.counter - 1,
        })

        await this.makeRequest();
    }
        
    handleClick = async (e) => {
        e.preventDefault();
        
        await this.setState({
            currentPage: 1
        })
        await this.makeRequest()
    }

    makeRequest = async () => {
        this.setState({ isLoading: true })
    
        const data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?perPage=1000&${this.state.searchBy}=${this.state.search}`);
    
        this.setState({
            pokeState: data.body.results,
            isLoading: false
        })}
        render(){
            // const {
            //     isLoading,
            //     pokeState,
            //     currentPage,
            //     totalPages,
            // } = this.state;
            
            return (
            <main>
                <form onSubmit={this.handleClick}> 
                    <div className="Box">
                        <input onChange={(e) => this.setState({ search: e.target.value })} />
                        <select onChange={(e) => { this.setState({ searchBy: e.target.value })} }>
                            <option value='pokemon'>Name</option>
                            <option value='type'>Type</option>
                            <option value='shapes'>Shapes</option>
                            <option value='ability_1'>Ability</option>
                            <option value='ability_hidden'>Hidden Ability</option>
                        </select>
                        <button onClick={this.handleClick}>Fetch Pokemon!</button>
                        <button onClick={this.handleClickBack}>Back</button>
                        <p value={this.props.counter}></p>
                        <button onClick={this.handleClickNext}>Next</button>
                        {
                            this.state.isLoading
                            ? <p>Loading</p>
                            : <ListPage pokeState={this.state.pokeState}/>
                        }
                    </div>
                </form>
            </main>    
            )
                
        };

    }

   
