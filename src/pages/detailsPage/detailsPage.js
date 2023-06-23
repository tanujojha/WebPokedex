import React, { useEffect, useState } from 'react';
import "./detailsPage.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { Link } from 'react-router-dom';

function DetailsPage() {

  const {pokeID} = useParams();
  const [pokemon, setPokemon] = useState({});
  const [specieDetails, setSpecieDetails] = useState({});
  const [loading, setLoading] = useState(true);
  
  async function fetchPokeDetails(){
    const pokeUrl = `https://pokeapi.co/api/v2/pokemon/${pokeID}/`;
    const pokeSpcUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokeID}/`;
    
    const res = await axios.get(pokeUrl);
    // console.log(res.data);
    setPokemon(res.data);
    
    const spcRes = await axios.get(pokeSpcUrl);
    // console.log(spcRes);
    setSpecieDetails(spcRes.data)
    setLoading(false)

  }

  function convertUnits(weightInHectograms, heightInDecimeters) {
    const weightInKilograms = weightInHectograms / 10;
    const heightInMeters = heightInDecimeters / 10;
  
    return {
      weightInKilograms,
      heightInMeters
    };
  }

  const handleBookmark = ()=>{
    localStorage.setItem("id", pokemon.id)
  }

  
  useEffect(()=>{
    fetchPokeDetails()
  }, [])
  
  return (
    loading ? <p>Loading...</p> :
    (
      <div className='detailsPage'>
        <div className='dppokenamediv'>
          <h1 className='dppokename'>{pokemon.name}</h1>
          <BookmarkOutlinedIcon onClick={handleBookmark} id='bookmarkicon'/>
        </div>
        <div className='dptop row'>
          <div className='dpimgdiv col-lg-4 col-sm-12 col-12'>
            <img className='dpimg' src={pokemon.sprites.front_default} alt={pokemon.name}/>
          </div>
          <div className='dpspecsdiv col-lg-8 col-sm-12 col-12'>
            <div className='dptyperankdiv'>
              <ul className='dptype'>
                {
                  pokemon.types.map((type, index)=> <li>{type.type.name}</li>)
                }
              </ul>
              <h5 className='dprank'>#{pokemon.id}</h5>
            </div>
            <div className='dpstatsdiv row'>
              {
                pokemon.stats.map((stat, index)=>{
                  return (
                    <div className='dpstatdiv'>
                      <span className='dpstat'>{stat.stat.name}</span>
                      <div style={{width: "90%"}} className="progress" role="progressbar" aria-label="Example with label" aria-valuenow={stat.base_stat} aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar" style={{width: stat.base_stat}}>{stat.base_stat}</div>
                      </div>
                    </div>
                  )
                })
              }
              
            </div>
          </div>
        </div>
        <div className='dpprofilediv'>
          <h3 className='dprofile'>Profile</h3>
          <div className='dpprofilelistdiv'>
            <div className='dpprofilelist'>
              <strong>Height :</strong>
              <span>{convertUnits(null, pokemon.height).heightInMeters} m</span>
            </div>
            <div className='dpprofilelist'>
              <strong>Weight :</strong>
              <span>{convertUnits(pokemon.weight, null).weightInKilograms} kg</span>
            </div>
            <div className='dpprofilelist'>
              <strong>Color :</strong>
              <span>{specieDetails.color.name}</span>
            </div>
            <div className='dpprofilelist'>
              <strong>Shape :</strong>
              <span>{specieDetails.shape.name}</span>
            </div>
            <div className='dpprofilelist'>
              <strong>Generation :</strong>
              <span>{specieDetails.generation.name}</span>
            </div>
            <div className='dpprofilelist'>
              <strong>Growth Rate :</strong>
              <span>{specieDetails.growth_rate.name}</span>
            </div>
            <div className='dpprofilelist'>
              <strong>Habitat :</strong>
              <span>{specieDetails.habitat.name}</span>
            </div>
            <div className='dpprofilelist'>
              <strong>Happiness :</strong>
              <span>{specieDetails.base_happiness}</span>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default DetailsPage