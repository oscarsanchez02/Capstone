import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TotalPriceCard({ cartItems }) {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');
    const navigate = useNavigate();

    // Calculate the total price
    const totalPrice = cartItems.reduce((total, item) => {
        const itemPrice = parseFloat(item.price) || 0;
        const itemQuantity = parseInt(item.quantity, 10) || 0;
        return total + (itemPrice * itemQuantity);
    }, 0);

    // Generate a random order number
    const handleConfirmOrder = () => {
        const newOrderNumber = Math.floor(Math.random() * 1000000);
        setOrderNumber(newOrderNumber);
        setShowConfirmation(true);
    };

    const handleOkClick = () => {
        navigate('/');
    };

    return (
        <div className="bg-blue-100 shadow-md rounded-lg p-4">
            <h2 className="flex justify-center text-lg font-bold underline">Your Items</h2>
            <div className="mt-4">
                {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2">
                        <div className="flex-1">
                            <h3 className="text-lg font-bold">{item.title}</h3>
                            <p className="text-gray-600">Quantity: {item.quantity} x ${item.price.toFixed(2)}</p>
                        </div>
                        <p className="text-gray-600">${(item.quantity * item.price).toFixed(2)}</p>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex justify-between items-center border-t-2 pt-2 border-black">
                <h2 className="text-lg font-bold">Total Price:</h2>
                <p className="text-gray-600">${totalPrice.toFixed(2)}</p>
            </div>
            <div className="mt-4 flex justify-center">
                <button
                    onClick={handleConfirmOrder}
                    className="bg-yellow-300 text-black text-xs font-bold uppercase rounded hover:bg-yellow-700 px-4 py-2">
                    Confirm Order
                </button>
            </div>
            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <p className="text-xl font-semibold mb-2">Thank you for shopping with us!</p>
                        <p className='md-4'>Arrival Time Within 3-5 Business Days</p>
                        <p className="mb-4">Your Order Number is: <span className="font-bold">{orderNumber}</span></p>
                        <button
                            onClick={handleOkClick}
                            className="bg-yellow-300 text-black text-xs font-bold uppercase rounded hover:bg-yellow-700 px-4 py-2">
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}