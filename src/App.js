import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { getTodos, deleteTodos, addTodo, editTodo } from "./Requests";
import "./App.css";
import TodoList from "./Components/Sections/TodoList/TodoList";
import TodoForm from "./Components/Sections/TodoForm/TodoForm";
import Modal from "./Components/UI/Modal/Modal";
import Button from "./Components/UI/Button/Button";

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
        <div className="container w-11/12 md:w-3/5 lg:w-7/12 xl:w-2/5 mx-auto">
          <h1 className="text-center py-12 text-4xl font-bold">To do</h1>
        </div>
        {didRequestFail && (
          <div className="bg-white h-screen w-screen flex items-center justify-center">
            <p>The data could not be retrieved. Try again.</p>
          </div>
        )}
        {!didRequestFail && (
          <Switch>
            <Route exact path="/">
              <div className="container w-11/12 md:w-3/5 lg:w-7/12 xl:w-2/5 mx-auto">
                <Link to="/create">
                  <Button label="Create new task" type="button" variant="add" />
                </Link>

                <TodoList
                  todos={todos}
                  onTodoDelete={onTodoDelete}
                  onTodoToggle={onTodoToggle}
                  onTodoEdit={openEditModal}
                />
              </div>
            </Route>

            <Route path="/create">
              <div className="bg-white w-screen flex items-center justify-center">
                <TodoForm onFormSubmitCallBack={onNewTaskAdd} />
              </div>
            </Route>
          </Switch>
        )}

        {editedTodo && (
          <Modal>
            <TodoForm
              onFormSubmitCallBack={onTaskEdit}
              isFormEdited
              onCloseEdit={closeEditModal}
              todo={editedTodo}
            />
          </Modal>
        )}
      </main>
    </Router>
  );
}

export default App;
