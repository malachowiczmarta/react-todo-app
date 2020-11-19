import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import Select from "../../UI/Select/Select";

function TodoForm({
  onFormSubmitCallBack,
  isFormEdited,
  onCloseEdit,
  todo = {},
}) {
  const history = useHistory();
  const [formState, setFormState] = useState({
    authorValidationLabel: "",
    titleValidationLabel: "",
    descValidationLabel: "",
    urlValidationLabel: "",
  });

  const {
    authorValidationLabel,
    titleValidationLabel,
    descValidationLabel,
    urlValidationLabel,
  } = formState;

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

    let regex = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );

    const setForm = (item, text) => {
      setFormState((prevState) => {
        const newState = {
          ...prevState,
        };

        newState[item] = text;

        return newState;
      });
    };

    if (newTodoAuthor.length < 3) {
      setForm("authorValidationLabel", "Podaj autora! (min 3 znaki)");

      // setFormState((prevState) => {
      //   return {
      //     ...prevState,
      //     authorValidationLabel: "Podaj autora! (min 3 znaki)",
      //   };
      // });
      isFormInvalid = true;
    } else {
      setForm("authorValidationLabel", "");

      // setFormState((prevState) => {
      //   return {
      //     ...prevState,
      //     authorValidationLabel: "",
      //   };
      // });
    }

    if (newTodoTitle.length < 5) {
      setForm("titleValidationLabel", "Wprowadź dłuższy tytuł! (min 5 znaków)");

      // setFormState((prevState) => {
      //   return {
      //     ...prevState,
      //     titleValidationLabel: "wprowadz dłuższy tytuł! (min 5 znaków)",
      //   };
      // });

      isFormInvalid = true;
    } else {
      setForm("titleValidationLabel", "");
      // setFormState((prevState) => {
      //   return { ...prevState, titleValidationLabel: "" };
      // });
    }

    if (newTodoDesc.length < 5) {
      setForm("descValidationLabel", "Wprowadz dłuższy opis! (min 5 znaków)");

      // setFormState((prevState) => {
      //   return {
      //     ...prevState,
      //     descValidationLabel: "wprowadz dłuższy opis! (min 5 znaków)",
      //   };
      // });
      isFormInvalid = true;
    } else {
      setForm("descValidationLabel", "");
      // setFormState((prevState) => {
      //   return {
      //     ...prevState,
      //     descValidationLabel: "",
      //   };
      // });
    }

    if (!newTodoUrl.match(regex)) {
      setForm("urlValidationLabel", "Wprowadź poprawnie adres url");

      // setFormState((prevState) => {
      //   return {
      //     ...prevState,
      //     urlValidationLabel: "wprowadź poprawnie adres url",
      //   };
      // });
      isFormInvalid = true;
    } else {
      setForm("urlValidationLabel", "");

      // setFormState((prevState) => {
      //   return {
      //     ...prevState,
      //     urlValidationLabel: "",
      //   };
      // });
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

    history.push({
      pathname: "/",
    });
  };

  return (
    <section className="container bg-white border-2 rounded border-gray-300 w-11/12 md:w-3/5 lg:w-7/12 xl:w-2/5 p-4 mx-auto">
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
          <Link to="/">
            <Button
              label="Anuluj"
              type="reset"
              variant="cancel"
              callbackFn={onCloseEdit}
            />
          </Link>
        )}
      </form>
    </section>
  );
}

export default TodoForm;
