import React, { useState } from "react";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import Select from "../../UI/Select/Select";

function TodoForm({ onFormSubmitCallBack, isFormEdited, close, todo = {} }) {
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
    let newTodoUrl = inputs[3].value;
    let newTodoPrio = inputs[4].value;

    let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);

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

    if (!newTodoUrl.match(regex)) {
      setUrlValidationLabel("wprowadź poprawnie adres url");
      isFormInvalid = true;
    } else {
      setUrlValidationLabel("");
    }

    if (isFormInvalid) return;

    //tworzymy obiekt task który będziemy wysyłać
    const todoObject = {
      author: newTodoAuthor,
      title: newTodoTitle,
      description: newTodoDesc,
      priority: newTodoPrio,
      url: newTodoUrl,
    };

    if (isFormEdited) {
      todoObject.id = todo.id;
    }

    onFormSubmitCallBack(todoObject);
    // na końcu czyścimy input i alerty
    for (const input of inputs) {
      input.value = "";
    }
  };

  return (
    <section className="container bg-white border-2 rounded border-gray-300 w-full lg:w-1/2 lg:p-4">
      <h2 className="text-gray-600 font-bold text-xl">
        {isFormEdited ? "Edytuj zadanie:" : "Stwórz zadanie:"}
      </h2>
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
          value={todo.author}
          validationError={authorValidationLabel}
        ></Input>

        <Input
          label="Tytuł zadania:"
          id="taskTitle"
          name="taskTitle"
          type="text"
          placeholder="Dom"
          value={todo.title}
          validationError={titleValidationLabel}
        ></Input>

        <Input
          label="Opis zadania:"
          id="taskDescription"
          name="taskDescription"
          type="text"
          placeholder="posprzatac lazienke"
          value={todo.description}
          validationError={descValidationLabel}
        ></Input>

        <Input
          label="Link:"
          id="taskUrl"
          name="taskUrl"
          type="text"
          placeholder="https://..."
          value={todo.url}
          validationError={urlValidationLabel}
        ></Input>

        <Select
          label="Priorytet zadania:"
          id="taskPriority"
          value={todo.priority}
        />

        <Button
          label={isFormEdited ? "Zapisz" : "Dodaj"}
          type="submit"
          variant="add"
        />
        {isFormEdited && (
          <Button
            label="Anuluj"
            type="reset"
            variant="cancel"
            callbackFn={close}
          />
        )}
      </form>
    </section>
  );
}

export default TodoForm;
