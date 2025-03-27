import React from "react";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
const CreateProfile = () => {

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitting form");
};

return (
    <div className="text-white bg-black h-screen flex flex-col justify-center items-center text-primary">
        <div className="text-white text-center text-6xl font-bold">Create Your Profile</div>
        <form onSubmit={handleSubmit} className="flex flex-col items-left mt-8">
            <div>
                <label className="px-4">Name:</label>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mb-4 p-2 rounded"
                /> 
            </div>
            <div className="">
            <label className="px-4">Email:</label>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4 p-2 rounded"
                />
            </div>
            <div>
            <label className="px-4">Password:</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-4 p-2 rounded"
                />
            </div>
            <div>
            <label className="px-4">Confirm Password:</label>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mb-4 p-2 rounded"
                />
            </div>
        </form>
            <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-300 rounded-full font-bold text-black mt-8 py-4 px-8"
            >
                Create Profile
            </button>
    </div>
);

};

export default CreateProfile;