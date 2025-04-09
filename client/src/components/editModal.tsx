import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_HABIT } from "../utils/mutations";


interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  habits: string[];
  habitId: string; // ✅ NEW
  onSave: (updatedHabit: string, frequency: number, unit: string, actualPerformance: number) => void; // added actualPerformance field
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, habits, habitId,  onSave }) => {
  const [editedHabit, setEditedHabit] = useState("");
  const [selectedHabit, setSelectedHabit] = useState(""); // Selected habit from the dropdown
  const [frequency, setFrequency] = useState<number | "">("");
  const [unit, setUnit] = useState(""); // pablo added
  const [actualPerformance, setActualPerformance] = useState<number | "">("");
  const [editHabit] = useMutation(EDIT_HABIT);

  // Reset the modal inputs when the modal opens
  useEffect(() => {
    if (isOpen) {
      const defaultHabit = habits[0] || ""; // Default to the first habit in the list
      setSelectedHabit(defaultHabit);
      setEditedHabit(""); // Set to empty string
      setFrequency("");
      setUnit("");
      setActualPerformance("");
    }
  }, [isOpen, habits]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editedHabit.trim() && frequency && unit.trim() && actualPerformance !== "") {
      onSave(editedHabit, Number(frequency), unit, Number(actualPerformance));
      
      await editHabit({
        variables: {
          habitId,
          input: {
            habitText: editedHabit,
            habitUsername: selectedHabit,
            habitDate: new Date().toISOString().split("T")[0], // sets today's date
            targetGoal: Number(frequency),
            targetGoalUnit: unit,
            actualPerformance: Number(actualPerformance),
            actualPerformanceUnit: unit,
            
          },
        },
      });
      
      // Clear the inputs after saving
      setEditedHabit("");
      setFrequency("");
      setUnit("");
      setActualPerformance(""); // Clear actualPerformance
      console.log("Habit updated successfully");
      onClose(); // Close the modal
    }
  };

  const handleHabitChange = (newHabit: string) => {
    setSelectedHabit(newHabit);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-black rounded-lg p-6 w-96 text-white">
        <h2 className="text-xl font-bold mb-4">Edit Habit</h2>
        <form onClick={handleSave}>
          <div className="flex flex-col gap-4">
            {/* Habit Dropdown */}
            <select
              value={selectedHabit}
              onChange={(e) => handleHabitChange(e.target.value)}
              className="border rounded p-2 bg-black text-white"
            >
              {habits.map((habit, index) => (
                <option key={index} value={habit}>
                  {habit}
                </option>
              ))}
            </select>

            {/* Custom Habit Input */}
            <input
              type="text"
              value={editedHabit}
              onChange={(e) => setEditedHabit(e.target.value)}
              placeholder="Edit your habit"
              className="border rounded p-2"
            />

            {/* Frequency Input the amount of time the user wants to put into the habit  */}
            <input
              type="number"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value ? parseInt(e.target.value) : "")}
              placeholder="Edit Time for habit per day"
              className="border rounded p-2"
            />

            {/* Unit Input */}
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="Enter unit(min, hours, etc.)"
              className="border rounded p-2"
            />
            {/* ✅ New field for actual performance */}
            <input
              type="number"
              value={actualPerformance}
              onChange={(e) =>
                setActualPerformance(e.target.value ? parseInt(e.target.value) : "")
              }
              placeholder="Enter time spent on habit"
              className="border rounded p-2"
            />
            
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="Enter unit (e.g., minutes, hours)"
              required
              className="border rounded p-2"
            />


            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                onClick={handleSave}
                className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 flex-1"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditedHabit(""); // Clear inputs when canceling
                  setFrequency("");
                  setUnit("");
                  onClose();
                }}
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;

// function setActualPerformance(arg0: string) {
//   throw new Error("Function not implemented.");
// }
