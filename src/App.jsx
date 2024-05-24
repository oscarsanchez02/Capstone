import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Register from './pages/Register';









function App() {
  return (
  <>
<Router>
  <NavBar/>
<Routes>
  <Route path='/' element={<Home />}/>
  <Route path='/login' element={<Login />}/>
  <Route path='/register' element={<Register />}/>
  <Route />
  <Route />
</Routes>
</Router>
  </>
  );
}

export default App
