import { useState, useEffect } from "react";
import { getCartById, fetchProductById } from "../API";
import CartItemCard from "../components/CartItemCard";
import { useNavigate } from "react-router-dom";

export default function Cart({ user, token }) {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCart() {
            if (!user || !user.id) {
                console.error("User or user ID not available");
                navigate('/');
                return;
            }

            try {
                console.log("Fetching cart for user ID:", user.id);
                const userCart = await getCartById(user.id);
                console.log("User cart response:", userCart);

                if (!userCart || userCart.status === 'error') {
                    console.error("Error fetching user cart:", userCart ? userCart.message : "No cart found");
                    return;
                }

                // Fetch details for each product in the cart
                const allProducts = await Promise.all(userCart.products.map(async (product) => {
                    const productDetails = await fetchProductById(product.productId);
                    return {
                        ...product,
                        ...productDetails,
                        cartId: userCart.id,
                        price: parseFloat(productDetails.price || 0),
                        quantity: parseInt(product.quantity, 10) 
                    };
                }));

                setCartItems(allProducts);
                console.log("Fetched cart items for user:", allProducts);
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        }
        fetchCart();
    }, [token, user, navigate]);

    const handleRemoveFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
    };

    const handleQuantityChange = (productId, newQuantity) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.productId === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const handleProceedToCheckout = () => {
        navigate('/checkout');
    };

    // Calculate the combined quantity of items in the cart
    const combinedQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="bg-gradient-to-b from-sky-400 to-white h-screen flex justify-center content-center">
            <div className="bg-white h-100 w-[1500px] p-4 justify-center">
                <h1 className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'">
                    Your Cart
                </h1>
                <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10'>
                    { cartItems.length > 0 ? (
                        cartItems.map((item, index) => (
                            <CartItemCard
                                key={`${item.productId}-${index}`}
                                item={item}
                                token={token}
                                onRemove={handleRemoveFromCart}
                                onQuantityChange={handleQuantityChange}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500 mt-10">
                            No Items Found in the Cart
                        </div>
                    )}
                </div>
                { cartItems.length > 0 && (
                    <>
                      <div className="flex justify-center mt-4">
                        <div className="bg-blue-100 shadow-md rounded-lg p-4">
                            <h2 className="text-lg font-bold">Total Quantity:</h2>
                            <p className="text-gray-600">{combinedQuantity}</p>
                        </div>
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={handleProceedToCheckout}
                            className="bg-yellow-300 text-black text-xs font-bold uppercase rounded hover:bg-yellow-700 px-4 py-2"
                            >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
                )}
            </div>
        </div>
    );
}