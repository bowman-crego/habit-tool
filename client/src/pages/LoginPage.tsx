 import React from 'react';
 import { useState } from 'react';

 const LoginPage = () => {

    const [username, setUsername] =  useState('');
    const [email, setEmail] =  useState('');
    const [password, setPassword] =  useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("submitting form");

    };

    return (
        <div className="text-white bg-black h-screen flex flex-col justify-center items-center text-primary">
        <div className="text-white text-center text-6xl font-bold">Login</div>
        <form onSubmit={handleSubmit} className="flex flex-col items-left mt-8">
            <div>
                <label className="px-4">Username:</label>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
        </form>
            <div className="flex flex-col justify-items-stretch mt-4">
            <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-300 rounded-full font-bold text-black mt-8 py-4 px-8"
            >
                Login
            </button>
            </div>
    </div>
    )
 }

 export default LoginPage;