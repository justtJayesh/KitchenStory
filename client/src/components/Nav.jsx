import { Vegan } from "lucide-react";
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
        <div className="w-full flex gap-9 px-[50px] items-center text-xl font-semibold  h-[80px]">
            <div className="p-1">
                <Vegan size={40} />
            </div>
            <div className="flex justify-center items-center gap-8">
                <Link to="/">Home</Link>
                <Link to="/favourites">Favourites</Link>
                {cookies.access_token ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <Link to="/auth">Login/Register</Link>
                )}
            </div>
        </div>
    );
};
