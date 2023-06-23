import React, { useEffect, useState } from 'react';
import "./listCard.css";
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    }, [PokemonUrl])

  return (
    <Link to={`/pokemon/${pokemon.id}`} className='link'>
        <div className='listcard'>
            <div className='cardimgdiv'>
                <img className='cardimg' src={loading ? "#" : pokemon.sprites.front_default} alt="..some pokemon.."/>
            </div>
            <div className='cardbody'>
                <h5 className='username'>{pokemon.name}</h5>
            </div>
        </div>
    </Link>

  )
}

export default ListCard