import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { ADD_HABIT } from '../utils/mutations'; // Import the ADD_HABIT mutation
interface HabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (habit: string, frequency: number, unit: string) => void;
  habits: string[];
  username: string;
}

const HabitModal: React.FC<HabitModalProps> = ({ isOpen, onClose, onAdd, username }) => {
  const [newHabit, setNewHabit] = useState('');
  const [selectedHabit, setSelectedHabit] = useState('');
  const [frequency, setFrequency] = useState<number | ''>('');
  const [unit, setUnit] = useState('');
  const [addHabit] = useMutation(ADD_HABIT);
  const presetHabits = ['Exercise', 'Sleep', 'Reading', 'Gaming'];

  if (!isOpen) return null;
//TODO: Need to connect addHabit and import ADD_HABIT mutation to connect this data to the database
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const habitToAdd = selectedHabit || newHabit;
    if (habitToAdd.trim() && frequency && unit.trim()) {
      try {
        await addHabit({
          variables: {
            input: {
              habitText: habitToAdd,
              habitUsername: username,
              targetGoal: frequency,
              targetGoalUnit: unit,
              habitDate: new Date().toISOString(),
            },
          }
        });
      onAdd(habitToAdd, Number(frequency), unit);
      setSelectedHabit('');
      setNewHabit('');
      setFrequency('');
      setUnit('');

    } catch (error) {
      console.error('Error adding habit:', error);
    }
  }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-black rounded-lg p-6 w-96 text-white">
        {/* Greeting */}
        <h2 className="text-xl font-bold mb-2">Hello, {username}!</h2>
        <p className="mb-4">Please select your habit that you'd like to begin tracking.</p>

        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex flex-col gap-4">
            {/* Dropdown for preset habits */}
            <select
              value={selectedHabit}
              onChange={(e) => setSelectedHabit(e.target.value)}
              className="border rounded p-2 bg-black text-white"
            >
              <option value="">Select a preset habit</option>
              {presetHabits.map((habit, index) => (
                <option key={index} value={habit}>
                  {habit}
                </option>
              ))}
            </select>

            {/* Custom input for new habit */}
            <p>Or enter your own custom habit below.</p>
            <input
              type="text"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              placeholder="Enter custom habit"
              className="border rounded p-2 bg-black text-white"
            />

            {/* Input for frequency */}
            <div className="flex gap-4">
              <input
                type="number"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value ? parseInt(e.target.value) : '')}
                placeholder="Enter frequency"
                className="border rounded p-2 bg-black text-white w-2/3"
              />

              {/* Input for unit */}
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="Enter unit"
                className="border rounded p-2 bg-black text-white w-2/3"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex-1"
              >
                Add
              </button>
              <button
                onClick={onClose}
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 flex-1"
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HabitModal;