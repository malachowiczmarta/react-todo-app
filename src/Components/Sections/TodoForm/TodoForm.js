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

    const { elements: inputs } = event.target;

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
      setForm(
        "authorValidationLabel",
        "Please enter the author! (at least 3 characters)"
      );
      isFormInvalid = true;
    } else {
      setForm("authorValidationLabel", "");
    }

    if (newTodoTitle.length < 5) {
      setForm(
        "titleValidationLabel",
        "Please enter a longer title! (at least 5 characters)"
      );
      isFormInvalid = true;
    } else {
      setForm("titleValidationLabel", "");
    }

    if (newTodoDesc.length < 5) {
      setForm(
        "descValidationLabel",
        "Please enter a longer description! (at least 5 characters)"
      );
      isFormInvalid = true;
    } else {
      setForm("descValidationLabel", "");
    }

    if (!newTodoUrl.match(regex)) {
      setForm("urlValidationLabel", "Enter the url correctly");
      isFormInvalid = true;
    } else {
      setForm("urlValidationLabel", "");
    }

    if (isFormInvalid) return;

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
        {isFormEdited ? "Edit task:" : "Create task:"}
      </h2>
      <form
        onSubmit={onFormSubmit}
        className="flex-col justify-center w-full py-5"
      >
        <Input
          label="Author:"
          id="taskAuthor"
          name="taskAuthor"
          type="text"
          placeholder="Ann"
          value={todo.author}
          validationError={authorValidationLabel}
        ></Input>

        <Input
          label="Task title:"
          id="taskTitle"
          name="taskTitle"
          type="text"
          placeholder="Cleaning"
          value={todo.title}
          validationError={titleValidationLabel}
        ></Input>

        <Input
          label="Task description:"
          id="taskDescription"
          name="taskDescription"
          type="text"
          placeholder="cleaning kitchen"
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
          label={isFormEdited ? "Save" : "Add"}
          type="submit"
          variant="add"
        />

        {isFormEdited && (
          <Link to="/">
            <Button
              label="cancel"
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
