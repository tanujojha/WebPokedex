import React, { useEffect, useState } from 'react';
import "./listPage.css";
import ListCard from '../../components/listCard/listCard';
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';


function ListPage({hasSearched}) {

    const dissableScrollStyle = {
        overflowY: "hidden",
        height: "100vh"
    }

    const [offset, setOffset] = useState(0) // offset
    const [error, setError]  = useState(null) // stores any error in fetching pokemons
    const [pokemons, setPokemons] = useState([]) // all pokemons consisting of url and name

    // Function to fetch Pokemons
    function getPokemons(){
        const pokeUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
        axios.get(pokeUrl)
        .then((res)=>{
            setPokemons((prev)=> [...prev, ...res.data.results]);
            setOffset((prev)=> prev + 20)
        })
        .catch((err)=> {
            setError(err)
        })
    }

    useEffect(()=>{
        getPokemons()
    }, [])


  return (

    <div style={hasSearched ? dissableScrollStyle : null}>

        <InfiniteScroll 
            dataLength={pokemons.length}
            next={getPokemons}
            hasMore = {error ? false : true}
            loader = {<p>Loading ...</p>}
            endMessage = {<p>No more Data</p>}
            >
            <div className='listPage'>
                {pokemons.map((pokemon, index)=> <ListCard poke={pokemon} key={index}/>)}
            </div>
            
        </InfiniteScroll>

    </div>
        
  )
}

export default ListPage 
