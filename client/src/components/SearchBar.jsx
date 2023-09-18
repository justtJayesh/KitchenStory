/* eslint-disable react/prop-types */
import axios from "axios";
import { Search } from "lucide-react";
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [inputSearch, setInputSearch] = useState("");

    const handleSearch = () => {
        axios
            .get("http://localhost:8000/recipes/search", {
                params: { query: inputSearch },
            })
            .then((res) => {
                // setRecipes(res.data.recipes);
                console.log(res.data);
                onSearch(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        setInputSearch("");
    };

    return (
        <div className="lg:w-[50%] md:w-[60%] w-[70%] mx-auto m-5">
            <div className="flex justify-between items-center gap-4">
                <input
                    className="block border py-2 px-4 w-full rounded-[50px]"
                    type="text"
                    value={inputSearch}
                    onChange={(e) => setInputSearch(e.target.value)}
                    placeholder="cookies, pasta, pie..."
                />
                <button
                    className="border flex gap-2 rounded-[50px] py-2 px-3 bg-black text-white"
                    onClick={handleSearch}
                >
                    <Search />
                    Search
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
