import React, { useState, useRef, useEffect } from "react";
import "./Todo.css";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function Todo() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const inputRef = useRef("null");

  useEffect(() => {
    inputRef.current.focus();
  });

  const addTodo = (e) => {
    e.preventDefault();
    if (input !== "") {
      setTodos([...todos, { list: input, id: Date.now(), status: false }]);
      setInput("");
    }

    if(editId){
      const editTodo=todos.find(item=>item.id==editId)
      const updateTodo= todos.map(item=>item.id==editTodo.id
      ? (item={id:item.id,list:input,status:item.status})
      :(item={id:item.id,list:item.list,status:item.status}))
      setTodos(updateTodo)
      setEditId(0)
    }

  };

  const onDelete = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const onComplete = (id) => {
    let complete = todos.map((item) => {
      if (item.id === id) {
        return { ...item, status: !item.status };
      }
      return item;
    });

    setTodos(complete);
  };

  const onEdit = (id) => {
    const editTodo = todos.find((item) => item.id === id);
    setInput(editTodo.list);
    setEditId(editTodo.id);
  };

  return (
    <div className="container">
      <h2>TODO APP</h2>

      <form className="form-group">
        <input
          type="text"
          placeholder="Enter your todo"
          className="form-control"
          value={input}
          ref={inputRef}
          onChange={(event) => setInput(event.target.value)}
        />
        <button onClick={addTodo}>{editId ? "Edit" : "Add"}</button>
      </form>

      <div className="list">
        <ul>
          {todos.map((item) => (
            <li className="form-control list-items">
              <div
                className="list-item-list"
                id={item.status ? "list-item" : null}
              >
                {item.list}
              </div>
              <span>
                <IoMdDoneAll
                  className="list-item-icons"
                  id="complete"
                  title="Complete"
                  onClick={() => onComplete(item.id)}
                />
                <FiEdit
                  className="list-item-icons"
                  id="edit"
                  title="Edit"
                  onClick={() => onEdit(item.id)}
                />
                <MdDelete
                  className="list-item-icons"
                  id="delete"
                  title="Delete"
                  onClick={() => onDelete(item.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
