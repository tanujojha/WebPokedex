import React, { useEffect, useState } from 'react';
import "./listCard.css";
import axios from 'axios';

function ListCard({poke}) {

    const PokemonUrl = poke.url
    const [pokemon, setPokemon] = useState({}); // holds pokemon's full data
    const [loading, setLoading] = useState(true);   // loader

    useEffect(()=>{
        axios.get(PokemonUrl)
        .then((res)=>{
            setPokemon(res.data)
            setLoading(false)
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])

  return (

    <div className='listcard'>
        <div className='cardimgdiv'>
            <img className='cardimg' src={loading ? "#" : pokemon.sprites.front_default} alt="..some pokemon.."/>
        </div>
        <div className='cardbody'>
            <h5 className='username'>{pokemon.name}</h5>
        </div>
    </div>

  )
}

export default ListCard