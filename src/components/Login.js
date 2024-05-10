import React, {useState} from "react";
import { View } from "react-native"; 
import '../styles/Login.css';
import { useNavigate  } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Login() {
  const  [name, setName] = useState('');
  const navigate = useNavigate();  

  const handleSignIn = async () => {
    try {
      if (name.length === 0) {
        window.alert('Warning! Enter a name');
      } else {
        await AsyncStorage.setItem('username', name);
        const value = await AsyncStorage.getItem('username');
        
        if (value === null) {
          window.alert('Error saving data');
        } else {
          navigate('/JokesList');
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
  return (
    <View style={{backgroundColor:'#d6d1e4', height:'100vh',  alignItems:'center', justifyContent:'center'}}>
     
        <form className="outerForm">
          <form className="innerForm">
            <div className="leftSection">
            <div className="signin-form">
              <span className="login-title">
                Sign in use
              </span>
             

            <input
              className="login-input"
              type="text"
              onChange={handleNameInput}
              value={name}
              placeholder="Enter your name"
            />

            
            <button 
              className="login-button"                                
              onClick={handleSignIn}
            >    
              Sign In
            </button>
          </div>

          </div>
          <div className="right-section">
            <div className="right-text">
              Hello, Friend!
            </div>
            <div className="right-text">
              Welcomeee
            </div>
            <div className="right-text">
              and
            </div>
            <div className="right-text">
              Have Fun!
            </div>
          </div>
        </form>

          
          
        </form>
     
    </View>


  );
}