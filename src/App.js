import React, { useEffect, useState } from "react";
import { getTodos, deleteTodos } from "./Requests";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [todos, updateTodos] = useState([]);

  useEffect(() => {
    getAndRenderTodos();
  }, []);

  const getAndRenderTodos = () => {
    getTodos().then((response) => {
      const { data } = response;
      updateTodos(data);
    });
  };

  const onDelete = (id) => {
    deleteTodos(id);
    getAndRenderTodos();
  };

  return (
    <main>
      <div>
        <h1>Twoja lista zadań:</h1>
        {todos.map((todo) => {
          return (
            <div className="todo" key={todo.id}>
              <h2>{todo.title}</h2>
              <p>{todo.description}</p>
              <button
                onClick={() => {
                  onDelete(todo.id);
                }}
                className="btn btn-danger"
              >
                Usuń
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default App;
