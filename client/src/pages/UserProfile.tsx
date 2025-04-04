import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";
import { useState } from "react";

const UserProfile = () => {
  // Execute the QUERY_ME GraphQL query to fetch the current user's info
  const { loading, error, data } = useQuery(QUERY_ME);

  // Inside your component, after fetching user data
  const [selectedDay, setSelectedDay] = useState("Monday"); // default to Monday
  
  // If the user is not logged in, show a message and block access to the profile
  if (!Auth.loggedIn()) {
    return (
      <p style={{ textAlign: "center" }}>Please log in to view your profile.</p>
    );
  }

  // While the query is still loading, show a loading message
  if (loading) return <p>Loading your profile...</p>;
  // If there was an error while fetching the data, show an error message
  if (error) return <p>Error loading profile 😢</p>;

  // Once data is loaded successfully, store the user info
  const user = data?.me;


  const days = [
    { label: "S", name: "Sunday" },
    { label: "M", name: "Monday" },
    { label: "T", name: "Tuesday" },
    { label: "W", name: "Wednesday" },
    { label: "T", name: "Thursday" },
    { label: "F", name: "Friday" },
    { label: "S", name: "Saturday" },
  ];
  return (
    // header Div for the user profile page
    <div className="bg-black min-h-screen text-white flex flex-col items-center">
      <div className="w-full py-6 shadow-md text-center">
        <h1 className="text-3xl md:text-4xl font-bold">
          Welcome, {user?.username}!
        </h1>
      </div>

      {/* Spacer */}
      <div className="h-4"></div>

      {/* Day Buttons */}
      <div className="flex gap-2 mb-8">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => setSelectedDay(day.name)}
            className={`w-10 h-10 rounded-full font-bold transition ${
              selectedDay === day.name
                ? "bg-white text-black"
                : "bg-gray-700 text-white hover:bg-gray-500"
            }`}
          >
            {day.label}
          </button>
        ))}
      </div>

      {/* Placeholder for day-specific content */}
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">
          Goals for {selectedDay === "S" ? "Sunday" : selectedDay}
        </h2>

        {/* TODO: Filter/display habits based on the selected day */}
        <p className="text-gray-400">No habits to show yet.</p>
      </div>
    </div>
  );
};

export default UserProfile;
