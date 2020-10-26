import React, { useEffect, useState } from "react";
import { getTodos, deleteTodos, addTodo } from "./Requests";
import "./App.css";
import TodoList from "./Components/Sections/TodoList";
import TodoCreation from "./Components/Sections/TodoCreation";

function App() {
  const [todos, updateTodos] = useState([]);
  const [didRequestFail, setRequestStatus] = useState(false);

  useEffect(() => {
    getAndRenderTodos();
  }, []);

  const getAndRenderTodos = () => {
    getTodos().then((response) => {
      const { data } = response;
      updateTodos(data);
    });
  };

  const onTodoDelete = (id) => {
    deleteTodos(id).then(() => {
      getAndRenderTodos();
    });
  };

  const addNewTask = (todo) => {
    addTodo(todo).then(() => {
      getAndRenderTodos();
    });
  };

  return (
    <main>
      <div className="container w-11/12 md:w-3/5 lg:w-4/5 mx-auto">
        <h1 className="text-center py-8 text-4xl font-bold">To do</h1>
        {didRequestFail && (
          <p>Nie udało się pobrać danych. Spróbuj ponownie.</p>
        )}
        {!didRequestFail && (
          <div className="container lg:flex">
            <TodoCreation addNewTask={addNewTask} />

            <TodoList todos={todos} onTodoDelete={onTodoDelete} />
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
