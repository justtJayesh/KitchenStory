import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import SearchBar from "../components/SearchBar";

const Home = () => {
    const [recipes, setRecipes] = useState([]);

    const getRecipes = async () => {
        try {
            const response = await axios.get("http://localhost:8000/recipes/");
            setRecipes(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearchedData = (data) => {
        setRecipes(data);
    };

    useEffect(() => {
        getRecipes();
    }, []);

    return (
        <>
            <SearchBar onSearch={handleSearchedData} />
            <div className="w-[90%] m-auto grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
                {recipes?.map((el) => (
                    <Card key={el.id} {...el} />
                ))}
            </div>
        </>
    );
};

export default Home;
