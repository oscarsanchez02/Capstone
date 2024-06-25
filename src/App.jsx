import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import SingleItem from './components/SingleItem';
import Profile from './pages/Profile';
import { getMe } from './API';
import CheckOut from './pages/CheckOut';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedToken = JSON.parse(localStorage.getItem('token'));
      if (storedToken) {
        try {
          const payload = JSON.parse(window.atob(storedToken.split(".")[1]));
          const userId = payload.sub || payload.id;
          const userData = await getMe(userId, storedToken);
          setUser(userData);
          setToken(storedToken);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const updateCartItems = (newCartItem) => {
    setCartItem(newCartItem);
  };

  return (
    <Router>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path='/' element={<Home user={user} />} />
        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/cart' element={<Cart user={user} token={token} cartItem={cartItem}/>} />
        <Route path='/user' element={<Profile user={user} token={token} />} />
        <Route path='/products/:itemId' element={<SingleItem user={user} token={token} updateCartItems={updateCartItems}/>} />
        <Route path='/checkout' element={<CheckOut user={user} token={token} cartItem={cartItem}/> }/>
      </Routes>
    </Router>
  );
}

export default App;