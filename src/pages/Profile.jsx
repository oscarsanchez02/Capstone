import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      const token = JSON.parse(localStorage.getItem('token'));
      if (!token) {
        navigate('/login');
      }
    }
  }, [user, navigate]);

  if (!user) {
    return <p>Loading...</p>;
  }
  const { name, username, email, address, phone } = user;

  return (
    <div className="bg-gradient-to-b from-sky-400 to-white h-screen flex justify-center content-center">
      <div className="bg-white h-100 w-[1500px] p-4 justify-center">
        <div className="w-48 h-48 bg-indigo-100 rounded-full shadow-2xl flex items-center justify-center text-indigo-500 mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="text-center border-b pb-12 w-full">
          <h1 className="text-4xl font-medium text-gray-700 capitalize">
            {name.firstname} {name.lastname}
          </h1>
          <p className="font-light text-gray-600 mt-3"><strong>Username:</strong> {username}</p>
          <p className="font-light text-gray-600 mt-3"><strong>Email:</strong> {email}</p>
          <p className="font-light text-gray-600 mt-3"><strong>Phone Number:</strong> {phone}</p>
          <p className="font-light text-gray-600 mt-3">
            <strong>Address:</strong> {address.city}, {address.street}, {address.number}, {address.zipcode}
          </p>
        </div>
      </div>
    </div>
  );
}