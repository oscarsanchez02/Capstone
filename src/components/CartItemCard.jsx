import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CartItemCard({ item, onRemove, onQuantityChange }) {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(item.quantity);

    function handleClick() {
        navigate(`/products/${item.productId}`);
    }

    const handleAdd = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleSubtract = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const handleRemove = () => {
        onRemove(item.productId);
        console.log(`Item ${item.productId} was removed from cart`);
    };

    useEffect(() => {
        onQuantityChange(item.productId, quantity);
    }, [quantity, item.productId, onQuantityChange]);

    return (
        <div className='bg-white shadow-md rounded-lg p-6 flex items-center'>
            <img
                src={item.image}
                alt={item.title}
                className='rounded-md h-20 w-20 mr-4'
            />
            <div className='flex-1'>
                <h1 className='text-lg uppercase font-bold'>{item.title}</h1>
                <p className='mt-2 text-gray-600 text-sm'>${item.price}</p>
                <div className="mt-2 text-gray-600 text-sm flex items-center">
                    <button
                        onClick={handleSubtract}
                        className='px-2 py-1 bg-gray-200 text-black text-xs font-bold uppercase rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-300 mr-2'
                    >
                        -
                    </button>
                    <p>{quantity}</p>
                    <button
                        onClick={handleAdd}
                        className='px-2 py-1 bg-gray-200 text-black text-xs font-bold uppercase rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-300 ml-2'
                    >
                        +
                    </button>
                </div>
                <div className="mt-4 flex">
                    <button
                        onClick={handleClick}
                        className='px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700 mr-2'
                    >
                        Details
                    </button>
                    <button
                        onClick={handleRemove}
                        className='px-4 py-2 bg-red-500 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}