import React, { useEffect, useState } from "react";
import { getTodos, deleteTodos, addTodo } from "./Requests";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [todos, updateTodos] = useState([]);
  const [newInputValue, setNewInputValue] = useState("");

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

  const addNewTask = (event) => {
    event.preventDefault();
    console.log(newInputValue);
    let task = {
      title: newInputValue,
      id: 1,
      description: "marta",
      priority: null,
      author: null,
      extra: null,
      url: "",
      parent_todo_id: null,
    };

    console.log(task);

    addTodo(task);
    getAndRenderTodos();
  };

  return (
    <main>
      <div className="container">
        <h1>To do</h1>
        <form>
          <label htmlFor="taskTitle">wpisz co chcesz</label>
          <input
            onChange={(event) => {
              setNewInputValue(event.target.value);
            }}
            type="text"
            id="taskTitle"
          ></input>
          <button onClick={addNewTask} type="submit">
            Dodaj
          </button>
        </form>
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
