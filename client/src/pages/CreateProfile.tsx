import {useState, type FormEvent, type ChangeEvent} from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
// import { CREATE_PROFILE } from "../utils/mutations.js";
// import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth.js";
import { ADD_USER } from "../utils/mutations";


const CreateProfile = () => {

    const [formState, setFormState] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formState.password !== formState.confirmPassword) {
        console.error("Passwords do not match");
        return;
    }

    try {
        const { data } = await addUser({
            variables: { input: {username: formState.username, email: formState.email, password: formState.password} },
   
});
    Auth.login(data.addUser.token);
    } catch (e) {
    console.error(e);
    }
};

return (
    <div className="text-white bg-black h-screen flex flex-col justify-center items-center text-primary">
        <div className="text-white text-center text-6xl font-bold">Create Your Profile</div>
        {data ? (
            <p className="text-green-500">Success!
            <Link to="/user-profile"></Link>
            </p>
        ) : (
            <p className="text-red-500">{error?.message}</p>
        )}
        <form onSubmit={handleFormSubmit} className="flex flex-col items-left mt-8">
            <div>
                <label className="px-4">Username:</label>
                <input
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={formState.username}
                    onChange={handleChange}
                    className="mb-4 p-2 rounded"
                /> 
            </div>
            <div className="">
            <label className="px-4">Email:</label>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="mb-4 p-2 rounded"
                />
            </div>
            <div>
            <label className="px-4">Password:</label>
                <input
                    type="password"
                    name="password"
                    placeholder="*****"
                    value={formState.password}
                    onChange={handleChange}
                    className="mb-4 p-2 rounded"
                />
            </div>
            <div>
            <label className="px-4">Confirm Password:</label>
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formState.confirmPassword}
                    onChange={handleChange}
                    className="mb-4 p-2 rounded"
                />
            </div>
            <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-300 rounded-full font-bold text-black mt-8 py-4 px-8"
            >
                Create Profile
            </button>
        </form>
    </div>
);

};

export default CreateProfile;