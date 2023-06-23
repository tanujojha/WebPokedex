import React, { useEffect, useState } from 'react'
import "./bkmrkPage.css"
import axios from 'axios';
import { Link } from 'react-router-dom';

function BkmrkPage() {

  const [favPokesDetails, setFavPokesDetails] = useState([]);
  const [loading, setLoading] = useState(true)

  async function fetchFavPokes(favPokesIds) {
    try {
  
      for (const pokeID of favPokesIds) {
        const pokeUrl = `https://pokeapi.co/api/v2/pokemon/${pokeID}/`;
        const res = await axios.get(pokeUrl);
        setFavPokesDetails((prev) => [...prev, res.data]);
      }
  
      setLoading(false)
    } catch (error) {
      console.error('Error fetching favorite Pokemon details:', error);
    }
  }
  

  useEffect(()=>{
    const favPokesIds = JSON.parse(localStorage.getItem("favpokes"));
    fetchFavPokes(favPokesIds)
    
  }, [])


  return (
    loading ? <p>Loading...</p> :
    (
      <div className='bkmrkPage'>
        <h1>Favourite Pokemons</h1>
        <div className='bmppokelistdiv'>
          {
            favPokesDetails.map((pokemon, index)=>{
              return(
                <Link to={`/pokemon/${pokemon.id}`} key={index} className='link'>
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
            })
          }
        </div>
      </div>
    )
  )
}

export default BkmrkPage