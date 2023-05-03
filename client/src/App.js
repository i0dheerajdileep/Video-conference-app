import logo from './logo.svg';
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Lobby from './screens/Lobby';
import Room from '../src/screens/Room'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Lobby/>}/>
        <Route path='/room/:roomId' element={<Room/>}/>
      </Routes>
    </div>
  );
}

export default App;
