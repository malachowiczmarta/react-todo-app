import axios from "axios";

export const getTodos = () => {
  return axios.get("http://51.75.120.145:3000/todo");
};

export const deleteTodos = (id) => {
  return axios.delete(`http://51.75.120.145:3000/todo/${id}`);
};

export const addTodo = (task) => {
  return axios.post("http://51.75.120.145:3000/todo", task);
};
