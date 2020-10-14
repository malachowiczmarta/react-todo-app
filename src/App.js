import React, { useEffect, useState } from "react";
import { getTodos, deleteTodo } from "./Requests";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [todos, updateTodos] = useState([]);

  useEffect(() => {
    getTodos().then((response) => {
      const { data } = response;
      updateTodos(data);
    });
  }, []);

  return (
    <main>
      <ul>
        {todos.map((todo) => {
          return <li>{todo.title}</li>;
        })}
      </ul>
    </main>
  );
}

export default App;
