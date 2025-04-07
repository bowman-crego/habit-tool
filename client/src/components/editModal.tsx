import React, { useState } from 'react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  habitToEdit: string;
  onSave: (updatedHabit: string) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, habitToEdit, onSave }) => {
  const [editedHabit, setEditedHabit] = useState(habitToEdit);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedHabit.trim()) {
      onSave(editedHabit);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-black rounded-lg p-6 w-96 text-white">
        <h2 className="text-xl font-bold mb-4">Edit Habit</h2>
        <form onSubmit={handleSave}>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={editedHabit}
              onChange={(e) => setEditedHabit(e.target.value)}
              placeholder="Edit your habit"
              className="border rounded p-2 bg-black text-white"
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
                onClick={onClose}
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