import React, { useState } from "react";
import HabitModal from "../components/habitModal";
import EditModal from "../components/editModal"; // Import the EditModal component
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";

const UserProfile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // For Add Habit Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // For Edit Habit Modal
  const [selectedDay, setSelectedDay] = useState("Monday"); // Default to Monday
  const [savedHabitsByDay, setSavedHabitsByDay] = useState<Record<string, string[]>>({
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });
  const [habitToEdit, setHabitToEdit] = useState<string | null>(null); // Track the habit being edited

  const handleAddHabit = (habit: string, frequency: number, unit: string) => {
    const newHabit = `${habit} (${frequency} ${unit})`;
    setSavedHabitsByDay((prevHabits) => ({
      ...prevHabits,
      [selectedDay]: [...(prevHabits[selectedDay] || []), newHabit],
    }));
  };

  const handleEditHabit = (updatedHabit: string, frequency: number, unit: string, date: string) => {
    if (habitToEdit) {
      const newHabit = `${updatedHabit} (${frequency} ${unit}) - ${date}`; // Combine habit, frequency, unit, and date
      setSavedHabitsByDay((prevHabits) => ({
        ...prevHabits,
        [selectedDay]: prevHabits[selectedDay].map((habit) =>
          habit === habitToEdit ? newHabit : habit
        ),
      }));
      setHabitToEdit(null); // Clear the habit being edited
      setIsEditModalOpen(false); // Close the Edit Modal
    }
  };
  
  const { loading, error, data } = useQuery(QUERY_ME);

  if (!Auth.loggedIn()) {
    return <p style={{ textAlign: "center" }}>Please log in to view your profile.</p>;
  }

  if (loading) return <p>Loading your profile...</p>;
  if (error) return <p>Error loading profile 😢</p>;

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
    <div className="bg-black min-h-screen text-white flex flex-col items-center">
      <div className="w-full py-6 shadow-md text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Welcome, {user?.username}!</h1>
      </div>

      <div className="h-4"></div>

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

      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">Goals for {selectedDay}</h2>
        <ul className="list-disc pl-6">
          {(savedHabitsByDay[selectedDay] || []).map((habit, index) => (
            <li key={index} className="mb-2 flex justify-between items-center">
              <span>{habit}</span>
              <button
                onClick={() => {
                  setHabitToEdit(habit); // Set the habit to edit
                  setIsEditModalOpen(true); // Open the Edit Modal
                }}
                className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg"
        >
          Add Habit
        </button>
      </div>

      <HabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddHabit}
        userName={user?.username || "Guest"}
        habits={savedHabitsByDay[selectedDay] || []}
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        habitToEdit={habitToEdit || ""}
        onSave={handleEditHabit}
      />
    </div>
  );
};

export default UserProfile;