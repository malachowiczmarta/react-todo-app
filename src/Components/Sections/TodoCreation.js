import React, { useState } from "react";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import Select from "../UI/Select";

function TodoCreation({ addNewTask }) {
  const [authorValidationLabel, setauthorValidationLabel] = useState("");
  const [titleValidationLabel, setTitleValidationLabel] = useState("");
  const [descValidationLabel, setDescValidationLabel] = useState("");
  const [urlValidationLabel, setUrlValidationLabel] = useState("");

  const onFormSubmit = (event) => {
    event.preventDefault();
    //wyciągnięcie z event.target elements i nazwanie go inputs - są tu obie wartości z obu inputów

    const { elements: inputs } = event.target;

    // walidacja długości wprowadzonego tytułu i opisu (musi byc return żeby błędnego valunie dało się submitować)
    let isFormInvalid = false;
    let newTodoAuthor = inputs[0].value;
    let newTodoTitle = inputs[1].value;
    let newTodoDesc = inputs[2].value;
    let newTodoPrio = inputs[3].value;
    let newTodoUrl = inputs[4].value;

    if (newTodoAuthor.length < 3) {
      setauthorValidationLabel("Podaj autora! (min 3 znaki)");
      isFormInvalid = true;
    } else {
      setauthorValidationLabel("");
    }

    if (newTodoTitle.length < 5) {
      setTitleValidationLabel("wprowadz dłuższy tytuł! (min 5 znaków)");
      isFormInvalid = true;
    } else {
      setTitleValidationLabel("");
    }

    if (newTodoDesc.length < 5) {
      setDescValidationLabel("wprowadz dłuższy opis! (min 5 znaków)");
      isFormInvalid = true;
    } else {
      setDescValidationLabel("");
    }

    if (isFormInvalid) return;

    //tworzymy obiekt task który będziemy wysyłać
    const todo = {
      author: newTodoAuthor,
      title: newTodoTitle,
      description: newTodoDesc,
      priority: newTodoPrio,
      url: newTodoUrl,
    };

    addNewTask(todo);
    // na końcu czyścimy input i alerty
    for (const input of inputs) {
      input.value = "";
    }
  };

  return (
    <section className="container w-full lg:w-1/2 lg:p-4">
      <h2 className="text-gray-600 font-bold text-xl">Stwórz zadanie:</h2>
      <form
        onSubmit={onFormSubmit}
        className="flex-col justify-center w-full py-5"
      >
        <Input
          label="Autor:"
          id="taskAuthor"
          name="taskAuthor"
          type="text"
          placeholder="Marta"
          validationError={authorValidationLabel}
        ></Input>

        <Input
          label="Tytuł zadania:"
          id="taskTitle"
          name="taskTitle"
          type="text"
          placeholder="Dom"
          validationError={titleValidationLabel}
        ></Input>

        <Input
          label="Opis zadania:"
          id="taskDescription"
          name="taskDescription"
          type="text"
          placeholder="posprzatac lazienke"
          validationError={descValidationLabel}
        ></Input>

        {/* <Input
          label="Link:"
          id="taskUrl"
          name="taskUrl"
          type="text"
          placeholder="https://..."
          validationError={urlValidationLabel}
        ></Input> */}

        <Select label="Priorytet zadania:" id="taskPriority" />

        <Button label="Dodaj nowy" type="submit" size={3} variant="add" />
      </form>
    </section>
  );
}

export default TodoCreation;
