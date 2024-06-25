import { useState } from "react";
import { login, getMe } from "../API"; 
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) { 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const { username, password } = formData;
  const [error, setError] = useState('');

  function handleOnChange(event) {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await login(formData);
    if (result && result.token) {
      localStorage.setItem('token', JSON.stringify(result.token));
      const payload = JSON.parse(window.atob(result.token.split(".")[1]));
      const userId = payload.sub || payload.id;
      const userData = await getMe(userId, result.token);
      setUser(userData);
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  }

  return (
    <div className="bg-gradient-to-b from-sky-400 to-white h-screen flex justify-center content-center">
      <div className="bg-white h-screen w-[1500px] p-4 justify-center">
        <h1 className='pt-6 block text-5xl font-medium leading-6 text-gray-900 text-center'>Please Login</h1>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          {error && <p className="text-red-500 text-center">{error}</p>} 
          <form onSubmit={handleSubmit} className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div>
              <label htmlFor='username' className='block text-sm font-medium leading-6 text-white text-center'>
                Username
              </label>
              <div className='mt-2'>
                <input
                  id='username'
                  name='username'
                  type='text'
                  value={username}
                  onChange={handleOnChange}
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div className='mt-4'>
              <label htmlFor='password' className='block text-sm font-medium leading-6 text-white text-center'>
                Password
              </label>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  value={password}
                  onChange={handleOnChange}
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div className='mt-4'>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}