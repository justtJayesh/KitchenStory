import axios from "axios";
import { Star } from "lucide-react";

// eslint-disable-next-line react/prop-types
export const Card = ({ id, image, title, readyInMinutes, healthScore }) => {
    const userID = window.localStorage.getItem("userID");

    const saveRecipe = async (id) => {
        console.log(id);

        try {
            const response = await axios.post(
                `http://localhost:8000/recipes/save`,
                {
                    params: { query: id, userID },
                }
            );
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div
                className="h-60 flex items-end bg-center bg-cover relative rounded-lg"
                style={{ backgroundImage: `url(${image})` }}
            >
                <div className="w-full h-full bg-gradient-to-t from-gray-800 to-transparent absolute rounded-lg" />
                <button
                    onClick={() => saveRecipe(id)}
                    className="absolute top-[3%] right-[3%]"
                >
                    <Star color="#ff0000" strokeWidth={3} absoluteStrokeWidth />
                </button>
                <div className="w-full flex flex-col z-50 p-3">
                    <h3 className="text-xl font-medium text-white">
                        Title: {title}
                    </h3>
                    <p className="font-medium text-white">
                        Time to prepare: {readyInMinutes}
                    </p>
                    <p className="font-medium text-white">
                        Health Score: {healthScore}
                    </p>
                </div>
            </div>
        </>
    );
};

// id
// image
// title
// instructions
// readyInMinutes
