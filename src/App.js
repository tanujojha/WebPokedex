import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import ListPage from './pages/listPage/listPage';
import { Route, Routes } from 'react-router-dom';
import BkmrkPage from './pages/bkmrkPage/bkmrkPage';
import DetailsPage from './pages/detailsPage/detailsPage';



function App() {

  const [searchedPoke, setSearchedPoke] = useState({});   // holds all the details of the searched pokemon
  const [loading, setLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const [favouritedPokes, setFavouritedPokes] = useState([]);   // holds favourited pokimons ids


  useEffect(()=>{
    localStorage.setItem("favpokes", JSON.stringify(favouritedPokes))
  }, [favouritedPokes])

  return (
    <div className="App">
      <Navbar setSearchedPoke={setSearchedPoke} setLoading={setLoading} setHasSearched={setHasSearched}/>
      {/* <ListPage searchedPoke={searchedPoke} loading={loading} hasSearched={hasSearched} setHasSearched={setHasSearched}/> */}

      <Routes>
        <Route path='/' element={<ListPage searchedPoke={searchedPoke} loading={loading} hasSearched={hasSearched} setHasSearched={setHasSearched}/>}/>
        <Route path='pokemon/:pokeID' element={<DetailsPage setFavouritedPokes={setFavouritedPokes}/>}/>
        <Route path='bookmarked' element={<BkmrkPage />}/>
      </Routes>
    </div>
  );
}

export default App;
