import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import "./floatingPage.css"
import { Link } from 'react-router-dom';

function FloatingCard({pokemon, loading, setHasSearched}){
    return(
        <Link to={`/pokemon/${pokemon.id}`} onClick={()=> setHasSearched(false)}>
            <div className='fltlistcard' >
                <div className='fltcardimgdiv'>
                    <img className='fltcardimg' src={loading ? "#" : pokemon.sprites.front_default} alt="..some pokemon.."/>
                </div>
                <div className='fltcardbody'>
                    <h5 className='fltusername'>{pokemon.name}</h5>
                </div>
            </div>
        </Link>
    )
}


function FloatingPage({searchedPoke, loading, setHasSearched}) {

  return (
        <div className='floatingPage col-sm-12' >
            <FloatingCard pokemon={searchedPoke} loading={loading} setHasSearched={setHasSearched}/>
            <CloseIcon onClick={()=> setHasSearched(false)} color="secondary" className='closeicon'/>
        </div>
        
  )
}

export default FloatingPage