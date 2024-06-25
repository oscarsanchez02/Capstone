import { useNavigate } from "react-router-dom";
import { getCartById, fetchProductById } from "../API";
import TotalPriceCard from "../components/TotalPriceCard";
import { useEffect, useState } from "react";

export default function CheckOut({ user }) {
    const [cartProducts, setCartProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.id) {
            navigate('/login');
            return;
        }

        const fetchCartProducts = async () => {
            try {
                const userCart = await getCartById(user.id);
                const productDetails = await Promise.all(
                    userCart.products.map(async (product) => {
                        const productInfo = await fetchProductById(product.productId);
                        return {
                            ...product,
                            ...productInfo,
                            price: parseFloat(productInfo.price),
                            total: parseFloat(productInfo.price) * parseInt(product.quantity)
                        };
                    })
                );
                setCartProducts(productDetails);
            } catch (error) {
                console.error("Error fetching cart products:", error);
            }
        };

        fetchCartProducts();
    }, [user, navigate]);

    if (!user || !cartProducts) {
        return <p>Loading...</p>;
    }

    const { name, address } = user;

    return (
        <div className="bg-gradient-to-b from-sky-400 to-white h-screen flex justify-center content-center">
            <div className="bg-white h-100 w-[1500px] p-4 justify-center">
                <h1 className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Please Review Your Order
                </h1>
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">Shipment Details</h2>
                    <p className="capitalize"><strong>Name:</strong> {name.firstname} {name.lastname}</p>
                    <p><strong>Shipping Address:</strong> {address.number} {address.street}, {address.city}, {address.zipcode}</p>
                </div>
                <div className="mt-6">
                    <TotalPriceCard cartItems={cartProducts} />
                </div>
            </div>
        </div>
    );
}