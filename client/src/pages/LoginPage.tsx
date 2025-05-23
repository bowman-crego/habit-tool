import { useState, FormEvent, ChangeEvent } from "react";
import Auth from "../utils/auth.js";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations.js";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate(); //pablo Added  <-- add this
  const [formState, setFormState] = useState({
    username: "",
    // email: '',
    password: "",
  });
  const [login, { data, error }] = useMutation(LOGIN_USER); //removed error for test deployment

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      // Save the token
      Auth.login(data.login.token); // stores token in localStorage
      console.log("Logging in successful, navigating to profile...");
      // 🔀 Redirect to user profile page
      navigate(`/user-profile/${formState.username}`);

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      username: "",
      // email: '',
      password: "",
    });
  };

  return (
    <div className="text-white bg-black h-screen flex flex-col justify-center items-center text-primary">
      <div className="text-white text-center text-6xl font-bold">Login</div>
      {data ? (
        <p className="text-green-500">
          Success! You may now head to your profile.
        </p>
      ) : (
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col items-left mt-8"
        >
          <div>
            <label className="px-4">Username:</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formState.username}
              onChange={handleChange}
              className="mb-4 p-2 rounded"
            />
          </div>
          {/* <div className="">
            <label className="px-4">Email:</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formState.email}
                    onChange={handleChange}
                    className="mb-4 p-2 rounded"
                />
            </div> */}
          <div>
            <label className="px-4">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formState.password}
              onChange={handleChange}
              className="mb-4 p-2 rounded"
            />
          </div>
          {/* JBNOTE: Display error message if login fails */}
          {error && (
            <p className="text-red-500 mt-4">
              {" "}
              Invalid username or password. Please try again.
            </p>
          )}
          <div className="flex flex-col justify-items-stretch mt-4">
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-300 rounded-full font-bold text-black mt-8 py-4 px-8"
            >
              Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
