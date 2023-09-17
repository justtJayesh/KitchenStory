import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import Favourites from "./pages/Favourites";
import CreateRecipes from "./pages/CreateRecipes";
import { Navbar } from "./components/Nav";

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Authentication />} />
                <Route path="/create-recipe" element={<CreateRecipes />} />
                <Route path="/favourites" element={<Favourites />} />
            </Routes>
        </>
    );
}

export default App;
