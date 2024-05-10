import { useEffect, useState } from "react";
import { View } from "react-native"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import '../styles/JokesList.css';
import { FaRegEdit } from "react-icons/fa";

export function TopBar(){
  const [name,setName] =useState('');
    useEffect(()=>{
        getData()
    },[]);    
 
    const getData = () => {
      try {
        AsyncStorage.getItem('username')
          .then((value) => {
            if (value != null) {
              setName(value);
            }
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    const updateData = async () => {
      try {
        if (name.length === 0) {
          window.alert('Warning! Enter a name');
        } else {
          await AsyncStorage.setItem('username', name);
          const value = await AsyncStorage.getItem('username');
          if (value === null) {
            window.alert('Error saving data');
          } else {
            window.alert('Name Updated');
          }
        }
      } catch (error) {
        console.error('Error:', error);
        window.alert('Error:', error);
      }
    };
    

      const handleNameInput = (e) => {
        setName(e.target.value);
      };
    return(
        
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: '#fff', padding: 10, borderBottom: 'solid 1px #cac5ce',display: 'flex', alignItems: 'center' }}>
            <span>Hi,</span>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <input               
                className="input-name-update"
                type="text"
                onChange={handleNameInput}
                value={name}
                placeholder="Enter your name"
              />
               
                <button 
                  className="update-button"                                
                  onClick={updateData}
                >    
                  <FaRegEdit />
                </button>
            </View>
        </View>
        
    );
        
        
}