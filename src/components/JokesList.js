import { useEffect, useState } from "react";
import { View } from "react-native"; 
import { TopBar } from "./TopBar";
import JokesTable from './JokesTable';
import axios from 'axios';
import Dropdown from 'react-dropdown';
import { TbRefresh } from "react-icons/tb";
import 'react-dropdown/style.css';
import '../styles/JokesList.css';
export function JokesList(){
    const [showFav,setShowFav] =useState(false)
    const [favorites,setFavorites] =useState(false)
    const [option,setOption] =useState('All')
    const [allJokes,setAllJokes] =useState([])
    const options = [
      'All', 'Misc', 'Pun','Dark','Programming'
    ];
    const updateState = () => {
        setShowFav(!showFav);
        fetchFavorites();
      };
      
    const onSelect = (selectedOption) => {
        setOption(selectedOption.value);
        if (selectedOption.value === 'Pun') {
          fetchPunJokes();
        }else if (selectedOption.value === 'Misc'){
            fetchMiscJokes();
        }else if (selectedOption.value === 'Dark'){
            fetchDarkJokes();
        }else if (selectedOption.value === 'Programming'){
            fetchProgrammingJokes();
        }else{
            fetchJokes();
        }
      };

      const onRefresh = () => {
        onSelect({ value: option });
      };
    
    const fetchJokes = () => {
        axios
          .get("https://v2.jokeapi.dev/joke/Any?amount=10")
          .then((res) => {
            setAllJokes(res.data.jokes);
          })
          .catch((error) => {
            console.error("Error fetching jokes:", error);
          });
      };

      const fetchPunJokes = () => {
        axios
          .get("https://v2.jokeapi.dev/joke/Pun?amount=10")
          .then((res) => {
            setAllJokes(res.data.jokes);
          })
          .catch((error) => {
            console.error("Error fetching jokes:", error);
          });
      };
      const fetchMiscJokes = () => {
        axios
          .get("https://v2.jokeapi.dev/joke/Misc?amount=10")
          .then((res) => {
            setAllJokes(res.data.jokes);
          })
          .catch((error) => {
            console.error("Error fetching jokes:", error);
          });
      };
      const fetchDarkJokes = () => {
        axios
          .get("https://v2.jokeapi.dev/joke/Dark?amount=10")
          .then((res) => {
            setAllJokes(res.data.jokes);
          })
          .catch((error) => {
            console.error("Error fetching jokes:", error);
          });
      };
      const fetchProgrammingJokes = () => {
        axios
          .get("https://v2.jokeapi.dev/joke/Programming?amount=10")
          .then((res) => {
            setAllJokes(res.data.jokes);
          })
          .catch((error) => {
            console.error("Error fetching jokes:", error);
          });
      };
      const fetchFavorites= () => {
        const favoritesData = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(favoritesData);
    };
      useEffect(() => {
        fetchJokes();
        fetchFavorites();
      }, []);
    return(
        
        <View style={{backgroundColor:"#e7e8f2",height:'100vh'}}>
          {
            !showFav &&
            <TopBar/>
          }
            <View style={{ flexDirection: 'column', marginTop: 20, marginBottom: 2, marginLeft: 2, marginRight: 2, backgroundColor:'#fff'}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', padding: 10, borderBottom: 'solid 1px #e7e8f2', marginTop: 20, marginBottom: 2, marginLeft: 2, marginRight: 2  }}>
                    <span className="list-name">{showFav ? 'Favourite List' : 'Jokes List'}</span>

                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>                        
                        {
                          !showFav &&                           
                          <button 
                              className="main-button"                                
                              onClick={updateState}>    
                            <span >Favourite List</span>
                          </button>
                        }
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', padding: 10, }}>
                  <Dropdown options={options} onChange={onSelect} value={option} placeholder="Select an option" />      

                  <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                      
                      {
                        !showFav &&
                          <button 
                            className="main-button"                                
                            onClick={onRefresh}>    
                              <span style={{ display: 'flex', alignItems: 'center' }}>
                                <TbRefresh style={{ marginRight: '5px' }} />
                                Refresh
                              </span>
                          </button>
                      }               
                  </View>   

              </View>

              <JokesTable style={{backgroundColor:'#fff'}} jokes={showFav? favorites:allJokes} saved={option}/>
            </View>            
        
          {
            showFav &&
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#fff', padding: 10,zIndex:-100}}>  
              <button 
                  className="close-button"                                
                  onClick={updateState}>    
                <span>Close</span>
              </button>
            </View>
          }
        </View>
        
    );
        
        
}