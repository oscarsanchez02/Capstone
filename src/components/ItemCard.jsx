import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addToCart } from "../API";


export default function ItemCard({ item, user, token}) {

  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  function handleClick() {
    navigate(`/products/${item.id}`);
  }

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    await addToCart(user.id, item.id, quantity, token);
  };

    return (
        <div className='bg-white shadow-md rounded-lg px-10 py-10'>
        <img
          src={item.image}
          alt={item.title}
          className='rounded-md'
        />
        <div className='mt-4'>
          <h1 className='text-lg uppercase font-bold'>{item.title}</h1>
          <p className='mt-2 text-gray-600 text-sm'>${item.price}</p>
          <p className="mt-2 text-gray-600 text-sm">{item.rating.rate}★</p>
        </div>
        <button
          onClick={handleClick}
          className='px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'
        >
          Details
        </button>
        <button
          onClick={handleAddToCart}
          className='px-4 py-2 ml-2 dark:bg-yellow-300 text-black text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'
        >
          ADD TO CART
        </button>

      </div>
    );
}