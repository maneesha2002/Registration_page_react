import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './components/Login';
import Login2 from './components/Login2';
import Home from './components/Home';

function App() {
  return (
   <div>
   <Router>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/login' element={<Login2/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
   </Router>
    </div>
  );
}

export default App;
