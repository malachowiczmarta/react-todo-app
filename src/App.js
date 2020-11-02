import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { getTodos, deleteTodos, addTodo, editTodo } from "./Requests";
import "./App.css";
import TodoList from "./Components/Sections/TodoList/TodoList";
import TodoForm from "./Components/Sections/TodoForm/TodoForm";
import Modal from "./Components/UI/Modal/Modal";

function App() {
  const [todos, updateTodos] = useState([]);
  const [editedTodo, setEditedTodo] = useState(false);
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

  const onTaskEdit = (todo) => {
    editTodo(todo)
      .then(() => {
        getAndRenderTodos();
        setEditedTodo(false);
      })
      .catch((error) => {
        console.log(error);
        setRequestStatus(true);
      });
  };

  const openEditModal = (todo) => {
    setEditedTodo(todo);
  };

  const closeEditModal = () => {
    setEditedTodo(false);
  };

  const onTodoToggle = (todo) => {
    // jeśli mamy parametr do funkcji to nie powinniśmy go zmieniać, zmieniamy na stringa a potem parsujemy więc go klonujemy
    let todoEdited = JSON.parse(JSON.stringify(todo));

    if (!todoEdited.extra) {
      todoEdited.extra = 1;
    } else {
      todoEdited.extra = null;
    }

    editTodo(todoEdited)
      .then(() => {
        getAndRenderTodos();
      })
      .catch((error) => {
        console.log(error);
        setRequestStatus(true);
      });
  };

  const onNewTaskAdd = (todo) => {
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
    <Router>
      <main>
        <div className="container w-11/12 md:w-3/5 lg:w-4/5 mx-auto">
          <h1 className="text-center py-12 text-4xl font-bold">To do</h1>
          {didRequestFail && (
            <p>Nie udało się pobrać danych. Spróbuj ponownie.</p>
          )}
          {!didRequestFail && (
            <div className="container lg:flex lg:justify-between">
              <TodoForm onFormSubmitCallBack={onNewTaskAdd} />

              <TodoList
                todos={todos}
                onTodoDelete={onTodoDelete}
                onTodoToggle={onTodoToggle}
                onTodoEdit={openEditModal}
              />
            </div>
          )}
        </div>
        {editedTodo && (
          <Modal>
            <TodoForm
              onFormSubmitCallBack={onTaskEdit}
              isFormEdited
              close={closeEditModal}
              todo={editedTodo}
            />
          </Modal>
        )}
      </main>
    </Router>
  );
}

export default App;
