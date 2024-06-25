import { useState } from "react";

export default function ItemSearch({ onSearch, onCategorySelect }) {

    const [searchQuery, setSearchQuery] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query);
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleCategoryClick = (category) => {
        onCategorySelect(category);
        setDropdownVisible(false);
    };

    return (
        <div>
            <div className="flex">
                <button 
                    id="dropdown-button" 
                    onClick={toggleDropdown}
                    className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-gray-700 dark:text-white dark:border-blue-800" 
                    type="button"
                >
                    Categories
                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            stroke-width="2" 
                            d="m1 1 4 4 4-4"
                        />
                    </svg>
                </button>
                {dropdownVisible && (
                    <div id="dropdown" className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-blue-600">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                            <li>
                                <button
                                    type="button"
                                    onClick={() => handleCategoryClick('All Items')}
                                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-700 dark:hover:text-white">
                                    All Items
                                </button>
                            </li>
                            <li>
                                <button 
                                    type="button" 
                                    onClick={() => handleCategoryClick("men's clothing")} 
                                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-700 dark:hover:text-white">
                                    Men's Clothing
                                </button>
                            </li>
                            <li>
                                <button 
                                    type="button" 
                                    onClick={() => handleCategoryClick("women's clothing")} 
                                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-700 dark:hover:text-white">
                                    Women's Clothing
                                </button>
                            </li>
                            <li>
                                <button 
                                    type="button" 
                                    onClick={() => handleCategoryClick("electronics")} 
                                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-700 dark:hover:text-white">
                                    Electronics
                                </button>
                            </li>
                            <li>
                                <button 
                                    type="button" 
                                    onClick={() => handleCategoryClick("jewelery")} 
                                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-700 dark:hover:text-white">
                                    Jewelery
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
                <div className="relative w-full">
                    <input 
                        type="search"
                        value={searchQuery} 
                        onChange={handleChange}
                        id="search-dropdown" 
                        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" 
                        placeholder="Search Clothes, Electronics, or Jewelery..." 
                        required 
                    />
                </div>
            </div>
        </div>
    );
}