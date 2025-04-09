import React, { useState, useEffect } from "react";
import HabitModal from "../components/habitModal";
import EditModal from "../components/editModal"; // Import the EditModal component
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";

const UserProfile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // For Add Habit Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // For Edit Habit Modal
  const [habitToEdit, setHabitToEdit] = useState<string | null>(null); // Track the habit being edited
  const [selectedDay, setSelectedDay] = useState("Monday"); // Default to Monday
  const [currentDate, setCurrentDate] = useState(new Date()); // Track the current date
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null); // Track the selected habit ID locally
  // const [savedHabitsByDay, setSavedHabitsByDay] = useState<Record<string, string[]>>({
  //   Sunday: [],
  //   Monday: [],
  //   Tuesday: [],
  //   Wednesday: [],
  //   Thursday: [],
  //   Friday: [],
  //   Saturday: [],
  // });

    // Update the current date at midnight
    useEffect(() => {
      const now = new Date();
      const timeUntilMidnight =
        new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();
  
      const timer = setTimeout(() => {
        setCurrentDate(new Date()); // Update the current date
      }, timeUntilMidnight);
  
      return () => clearTimeout(timer); // Cleanup the timer
    }, [currentDate]);

  // const handleAddHabit = (habit: string, frequency: number, unit: string) => {
  //   const newHabit = `${habit} (${frequency} ${unit})`;
  //   setSavedHabitsByDay((prevHabits) => ({
  //     ...prevHabits,
  //     [selectedDay]: [...(prevHabits[selectedDay] || []), newHabit],
  //   }));
  // };

  // const handleEditHabit = (updatedHabit: string, frequency: number, unit: string) => {
  //   if (habitToEdit) {
  //     const newHabit = `${updatedHabit} (${frequency} ${unit}) `; // Combine habit, frequency, unit
  //     setSavedHabitsByDay((prevHabits) => ({
  //       ...prevHabits,
  //       [selectedDay]: prevHabits[selectedDay].map((habit) =>
  //         habit === habitToEdit ? newHabit : habit
  //       ),
  //     }));
  //     setHabitToEdit(null); // Clear the habit being edited
  //     setIsEditModalOpen(false); // Close the Edit Modal
  //   }
  // };
  
  const { loading, error, data } = useQuery(QUERY_ME);
  // console.log("QUERY_ME data:", data);

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

  // Calculate the date for the selected day
  const getDateForSelectedDay = () => {
    const today = currentDate; // Use the current date
    const currentDayIndex = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const selectedDayIndex = days.findIndex((day) => day.name === selectedDay);
    const difference = selectedDayIndex - currentDayIndex;

    const selectedDate = new Date(today);
    selectedDate.setDate(today.getDate() + difference);

    return selectedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center">
      <div className="w-full py-6 shadow-md text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Welcome, {user?.username}!</h1>
      </div>
        <p className="text-lg text-gray-400">{getDateForSelectedDay()}</p> {/* Display the date */}
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

       {/* Habit List */}
       <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">All Your Habits</h2>
        <ul className="list-disc pl-6">
          {user.habits.map((habit: any, index: number) => (
            <li key={habit._id || index} className="mb-2 flex justify-between items-center">
              <div>
                <p className="font-semibold">{habit.habitText}</p>
                <p className="text-sm text-gray-300">
                  {habit.actualPerformance ?? 0}/{habit.targetGoal} {habit.targetGoalUnit} —{" "}
                  {habit.progress ?? 0}% complete
                </p>
              </div>
              
            </li>
          ))}
        </ul>
      </div>

      {/* Modals */}
      {/* Add Habit Button */}
<div className="flex justify-center gap-4 mt-8 mb-12">
  <button
    onClick={() => setIsModalOpen(true)}
    className="bg-teal-500 hover:bg-teal-300 rounded-full font-bold text-black py-4 px-8 shadow-lg"
  >
    Add Habit
  </button>
  <button
    onClick={() => {
      Auth.logout(); // Clear the authentication token
      window.location.assign("/login-page"); // Redirect to the login page
    }}
    className="bg-gray-700 text-white px-4 py-2 rounded-full font-bold hover:bg-gray-500 flex-1"
  >
    Logout
  </button>
  <div className="flex justify-center mt-4">
</div>
</div>

      <HabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={() => {}}
        username={user?.username || "Guest"}
        habits={user.habits}
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        habits={user.habits.map((habit: any) => habit.habitText)}
        habitId={selectedHabitId || ""}
        onSave={() => {}}
      />
    </div>
  );
};

export default UserProfile;