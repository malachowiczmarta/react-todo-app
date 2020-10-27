import React, { useEffect, useState } from "react";
import { getTodos, deleteTodos, addTodo, editTodo } from "./Requests";
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
    getTodos()
      .then((response) => {
        const { data } = response;
        updateTodos(data);
      })
      .catch((error) => {
        console.log(error);
        setRequestStatus(true);
      });
  };

  const onTodoDelete = (id) => {
    deleteTodos(id)
      .then(() => {
        getAndRenderTodos();
      })
      .catch((error) => {
        console.log(error);
        setRequestStatus(true);
      });
  };

  const onTodoToggle = (todo) => {
    // jeśli mamy parametr do funkcji to nie powinniśmy go zmieniać, zmieniamy na stringa a potem parsujemy więc go klonujemy
    let todoEdited = JSON.parse(JSON.stringify(todo));

    if (!todoEdited.extra) {
      todoEdited.extra = 1;
    } else {
      todoEdited.extra = null;
    }

    editTodo(todo.id, todoEdited)
      .then(() => {
        getAndRenderTodos();
      })
      .catch((error) => {
        console.log(error);
        setRequestStatus(true);
      });
  };

  const addNewTask = (todo) => {
    addTodo(todo)
      .then(() => {
        getAndRenderTodos();
      })
      .catch((error) => {
        console.log(error);
        setRequestStatus(true);
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

            <TodoList
              todos={todos}
              onTodoDelete={onTodoDelete}
              onTodoToggle={onTodoToggle}
            />
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
