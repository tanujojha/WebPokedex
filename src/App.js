import { useState } from 'react';
import './App.css';
// import ListCard from './components/listCard/listCard';
import Navbar from './components/navbar/navbar';
import ListPage from './pages/listPage/listPage';
import FloatingPage from './pages/floatingPage/floatingPage';
// import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';


function App() {

  const [searchedPoke, setSearchedPoke] = useState({});   // holds all the details of the searched pokemon
  const [loading, setLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false)



  return (
    <div className="App">
      <Navbar setSearchedPoke={setSearchedPoke} setLoading={setLoading} setHasSearched={setHasSearched}/>
      {/* <FloatingPage searchedPoke={searchedPoke} loading={loading}/> */}
      {/* {hasSearched ?  */}
        {/* <FloatingPage searchedPoke={searchedPoke} loading={loading}/> : */}
        {/* <ListPage/> */}
        <ListPage searchedPoke={searchedPoke} loading={loading} hasSearched={hasSearched} setHasSearched={setHasSearched}/>
      {/* } */}
    </div>
  );
}

export default App;
