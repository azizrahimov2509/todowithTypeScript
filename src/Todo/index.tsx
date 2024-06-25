import React, { useState } from "react";

type TodoProps = {
  todo: {
    id: number;
    text: string;
    done: boolean;
    timestamp: number;
  };
  editTodo: (id: number, newText: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

const Todo: React.FC<TodoProps> = ({
  todo,
  editTodo,
  toggleTodo,
  deleteTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  const handleDelete = () => {
    const reallyDelete = window.confirm(
      "Are you sure that you want to delete?"
    );
    if (reallyDelete) {
      deleteTodo(todo.id);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTodo(todo.id, newText);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewText(e.target.value);
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-base-100">
      {!isEditing ? (
        <div
          className={`flex items-center space-x-4 cursor-pointer ${
            todo.done ? "line-through text-gray-400" : ""
          }`}
          onClick={handleToggle}
        >
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-500"
            checked={todo.done}
            onChange={() => {}}
          />
          <span className="text-lg">{todo.text}</span>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <input
            type="text"
            className="input input-bordered px-4 py-2"
            value={newText}
            onChange={handleChange}
          />
          <button className="btn btn-primary px-4 py-2" onClick={handleSave}>
            Save
          </button>
        </div>
      )}
      <div className="flex items-center justify-between gap-3">
        <button
          className="btn btn-md btn-outline btn-secondary"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          className="btn btn-md btn-outline btn-error"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
