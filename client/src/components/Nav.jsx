import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const handleLogout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/auth");
    };

    return (
        <div className="flex gap-3 justify-center items-center h-[40px]">
            <Link to="/">Home</Link>
            <Link to="/create-recipe">Create Recipe</Link>
            <Link to="/favourites">Favourites</Link>
            {cookies.access_token ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <Link to="/auth">Login/Register</Link>
            )}
        </div>
    );
};
