/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [inputData, setInputData] = useState({ username: "", password: "" });

    const [_, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:8000/auth/login",
                inputData
            );

            setCookies("access_token", res.data.token);
            window.localStorage.setItem("userID", res.data.userID);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-4 rounded-lg border text-center">
            <Form
                inputData={inputData}
                setInputData={setInputData}
                label="Login"
                onSubmit={onSubmit}
            />
        </div>
    );
};

const Register = () => {
    const [inputData, setInputData] = useState({ username: "", password: "" });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/auth/register", inputData);
            alert("Registration completed");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-4 rounded-lg border text-center">
            <Form
                inputData={inputData}
                setInputData={setInputData}
                label="Register"
                onSubmit={onSubmit}
            />
        </div>
    );
};

const Form = (props) => {
    const { inputData, setInputData, label, onSubmit } = props;
    return (
        <>
            <form onSubmit={onSubmit} className="flex flex-col gap-3">
                <h2>{label}</h2>
                <div className=" w-[270px] flex justify-between items-center">
                    <input
                        className="border rounded-md py-1 px-2 w-full"
                        type="text"
                        placeholder="Username"
                        value={inputData.username}
                        onChange={(e) =>
                            setInputData({
                                ...inputData,
                                username: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="w-[270px] flex justify-between items-center">
                    <input
                        className="border rounded-md py-1 px-2 w-full"
                        type="password"
                        placeholder="Password"
                        value={inputData.password}
                        onChange={(e) =>
                            setInputData({
                                ...inputData,
                                password: e.target.value,
                            })
                        }
                    />
                </div>
                <button
                    type="submit"
                    className="w-24 p-1 border rounded-lg m-auto hover:bg-blue-100"
                >
                    {label}
                </button>
            </form>
        </>
    );
};

const Authentication = () => {
    return (
        <div className="w-full h-screen flex justify-evenly items-center">
            <Login />
            <Register />
        </div>
    );
};

export default Authentication;
