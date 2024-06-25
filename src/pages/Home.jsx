import { useEffect, useState } from "react";
import { fetchAllItems } from "../API";
import ItemCard from "../components/ItemCard";
import ItemSearch from "../components/SearchBar";

export default function Home({user}) {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const token = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        async function getItems() {
            const allItems = await fetchAllItems();
            setItems(allItems);
            setFilteredItems(allItems);
        }
        getItems();
    }, []);

    useEffect(() => {
        let filtered = items;

        if (selectedCategory && selectedCategory !== 'All Items') {
            filtered = filtered.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());
        }

        if (searchQuery) {
            filtered = filtered.filter(item =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredItems(filtered);
    }, [items, searchQuery, selectedCategory]);

    function handleSearch(query) {
        setSearchQuery(query);
    }

    function handleCategorySelect(category) {
        setSelectedCategory(category);
    }


    return (
        <div className="bg-gradient-to-b from-sky-400 to-white h-screen flex justify-center content-center">
            <div className="bg-white h-screen w-[1500px] p-4 justify-center">
                <div>
                    <ItemSearch onSearch={handleSearch} onCategorySelect={handleCategorySelect} />
                </div>
                <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10'>
                    { filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <ItemCard
                                key={item.id}
                                item={item}
                                user={user}
                                token={token}
                            />
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500 mt-10">
                        No Items Found
                    </div>
                )}
                </div>
            </div>
        </div>
    );
}