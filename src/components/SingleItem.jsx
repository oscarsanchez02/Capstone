import { fetchSingleItem, addToCart, getCartById } from "../API";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function SingleItem({ user, token, updateCartItems }) {
  const [item, setItem] = useState(null);
  const { itemId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const result = await addToCart(user.id, item.id, quantity, token);
      if (result) {
        console.log('Item added to cart:', result);

        // Optionally, fetch the updated cart and update the state
        const updatedCart = await getCartById(token);
        updateCartItems(updatedCart);

        alert('Item added to cart!');
      } else {
        console.log('Failed to add item to cart');
        alert('Failed to add item to cart. Please try again.');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('An error occurred while adding the item to the cart.');
    }
  };

  useEffect(() => {
    async function getItemById() {
      try {
        const fetchedItem = await fetchSingleItem(itemId);
        setItem(fetchedItem);
      } catch (error) {
        console.error(error);
      }
    }
    getItemById();
  }, [itemId]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-b from-sky-400 to-white h-screen flex justify-center content-center">
      <div className="bg-white h-screen w-[1500px] p-4 justify-center">
        <div className='bg-white shadow-md rounded-lg flex px-10 py-10'>
          <img
            src={item.image}
            alt={item.title}
            className="rounded-md w-70 h-80"
          />
          <div className="ml-10">
            <h1 className="text-lg uppercase font-bold">{item.title}</h1>
            <p className="mt-2 text-gray-600 text-sm">{item.description}</p>
            <p className="mt-2 text-gray-600 text-sm">Price: ${item.price}</p>
            <p className="mt-2 text-gray-600 text-sm">Rating: {item.rating.rate}★ ({item.rating.count} reviews)</p>
            <div className='mt-6'>
              <button
                onClick={handleAddToCart}
                className='px-4 py-2 dark:bg-yellow-300 text-black text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}