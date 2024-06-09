/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Create } from "./Create";
import axios from "axios";
import {
  BsCircleFill,
  BsFillCheckCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";

export const Home = () => {
  const [todos, setTodos] = useState([]);

  const handleEdit = (id) => {
    // eslint-disable-next-line no-undef
    axios
      .put(`http://localhost:3001/update/${id}`)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
        // eslint-disable-next-line no-undef
        axios
        .delete(`http://localhost:3001/delete/${id}`)
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
  }

  const fetchTodos = () => {
    axios
      .get("http://localhost:3001/get")
      .then((result) => {setTodos(result.data); fetchTodos();})
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTodos();
    handleDelete();
  }, []);

  return (
    <div className="home">
      <h2>Todo List</h2>
      <Create onAddSuccess={fetchTodos}/>
      {todos.length === 0 ? (
        <div>
          <h2>No Records</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div className="task" key={todo._id}>
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <BsFillCheckCircleFill className="icon filled" />
              ) : (
                <BsCircleFill className="icon" />
              )}
              <p className={todo.done ? "line-through" : ""}>{todo.task} </p>
            </div>
            <div>
              <span>
                <BsFillTrashFill className="icon bin-icon" onClick={() => handleDelete(todo._id)}/>
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
