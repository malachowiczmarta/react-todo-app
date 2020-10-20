import React, { useEffect, useState } from "react";
import { getTodos, deleteTodos, addTodo } from "./Requests";
import "./App.css";
import Button from "./Components/UI/Button/Button";
import Input from "./Components/UI/Input/Input";

function App() {
  const [todos, updateTodos] = useState([]);
  const [titleValidationLabel, setTitleValidationLabel] = useState("");

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
    //wyciągnięcie z event.target elements i nazwanie go inputs - są tu obie wartości z obu inputów
    const { elements: inputs } = event.target;

    // walidacja długości wprowadzonego tytułu
    if (inputs[0].value.length < 5) {
      setTitleValidationLabel("wprowadz dłuższy tytuł!");
      return;
    }

    //tworzymy obiekt task który będziemy wysyłać
    const todo = {
      title: inputs[0].value,
      description: inputs[1].value,
    };
    addTodo(todo).then(() => {
      getAndRenderTodos();
    });

    // na końcu czyścimy input
    for (const input of inputs) {
      input.value = "";
    }
  };

  return (
    <main>
      <div className="sm:container sm:mx-auto">
        <h1>To do</h1>
        <form onSubmit={addNewTask} className="w-full">
          <Input
            label="Tytuł zadania:"
            id="taskTitle"
            name="taskTitle"
            type="text"
            placeholder="Dom"
            validationError={titleValidationLabel}
          ></Input>

          <Input
            label="Opis zadania"
            id="taskDescription"
            name="taskDescription"
            type="text"
            placeholder="posprzatac lazienke"
            validationError={titleValidationLabel}
          ></Input>

          <Button
            label="Dodaj nowy"
            type="submit"
            callbackFn={() => {
              console.log("kliknieto add");
            }}
            size={3}
            variant="add"
          />
        </form>
        {/* <h1>Twoja lista zadań:</h1> */}
        {todos.map((todo) => {
          return (
            <div
              className="flex bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 m-4 text-gray-700 leading-tight focus:outline-none"
              key={todo.id}
            >
              <div className="flex-1">
                <h2>{todo.title}</h2>
                <p>{todo.description}</p>
              </div>

              <Button
                label="Usuń"
                type="delete"
                callbackFn={() => {
                  onDelete(todo.id);
                }}
                size={2}
                variant="delete"
              />
              <Button label="Edytuj" type="edit" size={2} variant="edit" />
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default App;
