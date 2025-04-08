import React, { useState, useEffect } from "react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  habits: string[];
  onSave: (updatedHabit: string, frequency: number, unit: string) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, habits, onSave }) => {
  const [editedHabit, setEditedHabit] = useState("");
  const [selectedHabit, setSelectedHabit] = useState(""); // Selected habit from the dropdown
  const [frequency, setFrequency] = useState<number | "">("");
  const [unit, setUnit] = useState("");

  // Reset the modal inputs when the modal opens
  useEffect(() => {
    if (isOpen) {
      const defaultHabit = habits[0] || ""; // Default to the first habit in the list
      setSelectedHabit(defaultHabit);
      setEditedHabit(""); // Set to empty string
      setFrequency("");
      setUnit("");
    }
  }, [isOpen, habits]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedHabit.trim() && frequency && unit.trim()) {
      onSave(editedHabit, Number(frequency), unit);
      // Clear the inputs after saving
      setEditedHabit("");
      setFrequency("");
      setUnit("");
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
        <form onSubmit={handleSave}>
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

            {/* Frequency Input */}
            <input
              type="number"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value ? parseInt(e.target.value) : "")}
              placeholder="Enter frequency"
              className="border rounded p-2"
            />

            {/* Unit Input */}
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="Enter unit"
              className="border rounded p-2"
            />

            <div className="flex gap-4 mt-4">
              <button
                type="submit"
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