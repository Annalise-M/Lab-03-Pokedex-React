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
        totalPages: 1
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
        
        await this.makeRequest();
    }
    

    makeRequest = async () => {
        this.setState({ isLoading: true });
            
        const data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?page=${this.state.currentPage}&perPage=20&${this.state.searchBy}=${this.state.search}`);

        await this.setState({
            pokeState: data.body.results,
            totalPages: Math.ceil(data.body.count / 20),
            isLoading: false,
        })

        const params = new URLSearchParams(this.props.location.search);

        params.set('search', this.state.search);
        params.set('searchBy', this.state.searchBy);
        params.set('page', this.state.currentPage);

        this.props.history.push('?' + params.toString());
    }


    handleSubmit = async (e) => {
        e.preventDefault();

        await this.setState({
            currentPage: 1
        })
        await this.makeRequest();
    }

        
    handleClick = async (e) => {
        e.preventDefault();
        
        await this.setState({
            currentPage: 1
        })
        await this.makeRequest();
    }

    
    handleClickNext = async () => {
        await this.setState({ currentPage: Number(this.state.currentPage) + 1 })
        
        await this.makeRequest();
    }


    handleClickBack = async () => {
        await this.setState({ currentPage: Number(this.state.currentPage) - 1 })
        
        await this.makeRequest();
    }


    // makeRequest = async () => {
    //     this.setState({ isLoading: true })
    
    //     const data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?perPage=1000&${this.state.searchBy}=${this.state.search}`);
    
    //     this.setState({
    //         pokeState: data.body.results,
    //         isLoading: false
    //     })}

        render(){
            console.log(this.state.currentPage)
            const {
                isLoading,
                pokeState,
                currentPage,
                totalPages,
            } = this.state;
            
            return (
            <main>
                <div className="SideBar">
                <form onSubmit={this.handleSubmit}> 
                    <div className="SideBar">
                        <input onChange={(e) => this.setState({ search: e.target.value })} value={this.state.search} />
                        <select onChange={(e) => { this.setState({ searchBy: e.target.value })} }value={this.state.searchBy} >
                            <option value='pokemon'>Name</option>
                            <option value='type'>Type</option>
                            <option value='shapes'>Shapes</option>
                            <option value='ability_1'>Ability</option>
                            <option value='ability_hidden'>Hidden Ability</option>
                        </select>
                        <button>Fetch Pokemon!</button>
                        
                    </div>
                    <div className="Results">
                        {
                            isLoading
                            ? <p>Loading</p>
                            : <ListPage 
                                handleClickNext={this.handleClickNext} handleClickBack={this.handleClickBack}
                                currentPage={currentPage}
                                pokeState={pokeState}
                                totalPages={totalPages} 
                            />
                        }
                    </div>
                </form>
                </div>
            </main>    
            )
                
        };

    }

   
