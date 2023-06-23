import React, { useState } from 'react';
import "./navbar.css"
import axios from 'axios';
import { Link } from 'react-router-dom';

function Navbar({setSearchedPoke, setLoading, setHasSearched}) {

    const [pokename, setPokename] = useState("");

    const handleChange = (e)=>{
        setPokename(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        const pokeUrl = `https://pokeapi.co/api/v2/pokemon/${pokename}`
        axios.get(pokeUrl)
        .then((res)=>{
            console.log(res.data);
            setSearchedPoke(res.data)
            setLoading(false)
            setHasSearched(true)
        })
        .catch((err)=>{
            console.log(err);
        })
    }


  return (
    <nav className="navbar navbar-expand-lg bg-dark border-bottom border-bottom-dark" data-bs-theme="dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">Pokedex</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <form className="d-flex" role="search" onSubmit={handleSubmit}>
                    <input onChange={handleChange} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link active" to="/bookmarked">Bookmark</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar