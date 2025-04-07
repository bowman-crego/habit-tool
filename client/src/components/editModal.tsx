import React, { useState, useEffect } from "react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  habitToEdit: string;
  onSave: (updatedHabit: string, frequency: number, unit: string, date: string) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSave }) => {
  const [editedHabit, setEditedHabit] = useState("");
  const [frequency, setFrequency] = useState<number | "">("");
  const [unit, setUnit] = useState("");
  const [date, setDate] = useState("");

  // Reset the modal inputs when the modal opens
  useEffect(() => {
    if (isOpen) {
      setEditedHabit(""); // Set to empty string
      setFrequency("");
      setUnit("");
      setDate(new Date().toISOString().split("T")[0]); // Set to today's date in YYYY-MM-DD format
    }
  }, [isOpen]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedHabit.trim() && frequency && unit.trim() && date) {
      onSave(editedHabit, Number(frequency), unit, date);
      // Clear the inputs after saving
      setEditedHabit("");
      setFrequency("");
      setUnit("");
      setDate("");
      onClose(); // Close the modal
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-black rounded-lg p-6 w-96 text-white">
        <h2 className="text-xl font-bold mb-4">Edit Habit</h2>
        <form onSubmit={handleSave}>
          <div className="flex flex-col gap-4">
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

            {/* Date Input */}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded p-2"
            />

            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex-1"
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