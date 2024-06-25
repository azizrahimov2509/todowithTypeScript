import React, { useState, useEffect } from "react";
import Todo from "..";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<
    { id: number; text: string; done: boolean; timestamp: number }[]
  >([]);
  const [newTodoText, setNewTodoText] = useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text: newTodoText,
        done: false,
        timestamp: Date.now(), // добавляем timestamp
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setNewTodoText("");
    }
  };

  const editTodo = (id: number, newText: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="mx-auto w-[550px] mt-8 bg-white p-4 rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
      <form onSubmit={addTodo}>
        <div className="flex mb-4">
          <input
            type="text"
            className="input input-bordered w-full p-4"
            placeholder="Enter new todo"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
          />
          <button type="submit" className="btn btn-primary ml-2">
            Add Todo
          </button>
        </div>
      </form>
      <div className="space-y-4">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            editTodo={editTodo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
