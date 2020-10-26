import React from "react";
import Button from "../UI/Button/Button";

function TodoList({ todos, onTodoDelete }) {
  return (
    <section className="container w-full lg:w-1/2 lg:p-4">
      <h2 className="mb-5 text-gray-600 font-bold text-xl">
        Twoja lista zadań:
      </h2>
      {todos.map((todo) => {
        return (
          <div
            className={`flex bg-gray-200 appearance-none border-2 border-gray-300 rounded w-full py-2 px-2 mb-4 text-gray-800`}
            key={todo.id}
          >
            <Button
              label={<i className="fas fa-check"></i>}
              type="check"
              variant="check"
              priority={todo.priority}
            />

            <div className="flex-1">
              <h2 className={"font-semibold"}>{todo.title}</h2>
              <p>Opis: {todo.description}</p>
              <p>Autor: {todo.author}</p>
            </div>

            <div className="flex justify-between w-12">
              <Button
                label={<i className="fas fa-trash"></i>}
                type="delete"
                callbackFn={() => {
                  onTodoDelete(todo.id);
                }}
                variant="delete"
              />

              <Button
                label={<i className="fas fa-edit"></i>}
                callbackFn={() => {
                  // onEdit(todo, todo.id);
                }}
                type="edit"
                variant="edit"
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default TodoList;
