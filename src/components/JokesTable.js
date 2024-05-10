import React, { useEffect, useState } from 'react';
import { View } from "react-native"; 
import '../styles/JokesTable.css';
import { IoMdHeart} from "react-icons/io";

const JokesTable = ({ jokes , saved }) => {
    const [favorites, setFavorites] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

  
    useEffect(() => {
      const favoritesData = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(favoritesData);
    }, []);

    const handleFavorite = (id) => {
 
        const joke = jokes.find(joke => joke.id === id);
        if (!joke) return; 
    
        const updatedFavorites = [...favorites];
        const index = updatedFavorites.findIndex(fav => fav.id === joke.id);
        if (index === -1) {
          updatedFavorites.push(joke);
        } else {
          updatedFavorites.splice(index, 1);
        }
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };
      const isFavorite = (id) => {
        return favorites.some(fav => fav.id === id);
      };
      const handleRowsPerPageChange = (e) => {
        setRowsPerPage(parseInt(e.target.value));
    };
    const handleNextPage = () => {
      setCurrentPage(currentPage + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
};
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = currentPage * rowsPerPage;
  let jokesToShow = jokes;
    if (saved !== 'All') {
        jokesToShow = jokes.filter(joke => joke.category === saved);
    }
    
    jokesToShow = jokesToShow.slice(startIndex, endIndex);
  return (
    <>
    <table>
      <thead>
        <tr>
          <th>FAVOURITE</th>
          <th>ID</th>
          <th>TYPE OF JOKES</th>
          <th style={{textAlign:'left'}}>SETUP</th>
          <th style={{textAlign:'left'}}>PUNCHLINE</th>
        </tr>
      </thead>
      <tbody>
        {jokesToShow.map((joke) => (
            <tr key={joke.id}>
                <td>
              
                  <button className={`favButton ${isFavorite(joke.id)? 'fav-red' : 'fav-grey'}`} onClick={() => handleFavorite(joke.id)}>
                    {isFavorite(joke.id) ? <IoMdHeart className="fav-red"  /> : <IoMdHeart className="fav-grey" />}
                </button>
                </td>
                <td>{joke.id}</td>
                <td>{joke.category}</td>
                {joke.type === 'single' ? (
                    <td colSpan={2} style={{ textAlign: 'left' }}>{joke.joke}</td>
                ) : (
                    <>
                        <td style={{ textAlign: 'left' }}>{joke.setup}</td>
                        <td style={{ textAlign: 'left' }}>{joke.delivery}</td>
                    </>
                )}
            </tr>
        ))}
      </tbody>
      
    </table>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',  padding: 10, marginBottom: 2, marginLeft: 2, marginRight: 2  ,zIndex:-100}}>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10,  marginTop: 20, marginBottom: 2, marginLeft: 2, marginRight: 2  }}>
      <span onClick={currentPage !== 1 ? handlePrevPage : undefined} className={`button-span ${currentPage === 1 ? 'disabled' : ''}`}>&lt;</span>
      <span className="button-span disabled" >{currentPage}</span>
      <span onClick={endIndex < jokes.length ? handleNextPage : undefined} className={`button-span ${endIndex >= jokes.length ? 'disabled' : ''}`}>&gt;</span>
   

    </View>
      <View style={{ flexDirection: 'row', padding: 10, marginTop: 20, marginBottom: 2, marginLeft: 2, marginRight: 2  }}>

        <select id="rowsPerPage" value={rowsPerPage} onChange={handleRowsPerPageChange} style={{marginRight:'10px'}}>
          <option value={1}>1</option>
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
        <span style={{color:'#828488'}}>Showing rows from {startIndex + 1} to {Math.min(endIndex, jokes.length)}</span>

        </View>
  </View>
  </>
  );
};

export default JokesTable;
