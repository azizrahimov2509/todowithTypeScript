import React, { useState, useEffect } from "react";
import TodoList from "./Todo/Todolist";

const App: React.FC = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={toggleTheme} className="btn btn-primary m-4">
          Change Mode
        </button>
        <TodoList />
      </header>
    </div>
  );
};

export default App;
