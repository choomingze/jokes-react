import logo from './logo.svg';
import './App.css';
import { Login } from './components/Login'
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { JokesList } from './components/JokesList'
function App() {
  return (
    <div className="App">
      {/* <Login/> */}
      <Router>
      <Routes >
        <Route path="/JokesList" element={<JokesList/>} />
        <Route path="/" element={<Login />}/>
      </Routes >
    </Router>
    </div>
  );
}

export default App;
