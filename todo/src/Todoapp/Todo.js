import React, { useEffect, useState } from "react";
import "../App.css";
// import { AiOutlineDelet } from "react-icons";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

function App() {
  const [status, setStatus] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");

  const handleAddTodo = () => {
    let newTodoItem = {
      title: title,
      description: description,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handlecompletedelete = (index) => {
    let deletedTodo = [...completedTodos];
    deletedTodo.splice(index, 1);
    localStorage.setItem("CompletedTodos", JSON.stringify(deletedTodo));
    setCompletedTodos(deletedTodo);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + "-" + mm + "-" + yyyy + "at" + h + ":" + m + ":" + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem("CompletedTodos", JSON.stringify(updatedCompletedArr));
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedTodo = JSON.parse(localStorage.getItem("CompletedTodos"));
    if (savedTodo) {
      setTodos(savedTodo);
    }
    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  const handleEdit = (ind, item) => {
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  };

  const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, title: value };
    });
  };

  const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, description: value };
    });
  };

  const handleUpdateToDo = () => {
    let newToDO = [...allTodos];
    newToDO[currentEdit] = currentEditedItem;
    setTodos(newToDO);
    setCurrentEdit("");
  };
  return (
    <>
      <h1>My Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="what's the todo's task"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="what's the todo's description"
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${status === false && "active"}`}
            onClick={() => setStatus(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${status === true && "active"}`}
            onClick={() => setStatus(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {status === false &&
            allTodos.map((item, index) => {
              if (currentEdit === index) {
                return (
                  <div className="edit-wrapper" key={index}>
                    <input
                      placeholder="Updated Title"
                      onChange={(e) => handleUpdateTitle(e.target.value)}
                      value={currentEditedItem.title}
                    />
                    <textarea
                      placeholder="Updated Description"
                      rows={4}
                      onChange={(e) => handleUpdateDescription(e.target.value)}
                      value={currentEditedItem.description}
                    />
                    <button
                      type="button"
                      onClick={handleUpdateToDo}
                      className="primaryBtn"
                    >
                      Update
                    </button>
                  </div>
                );
              } else {
                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>

                    <div>
                      {/* <AiOutlineDelet className="delete-icon" /> */}
                      <AiOutlineDelete
                        className="delete-icon"
                        title="deleted permanently"
                        onClick={() => handleDeleteTodo(index)}
                      />
                      <BsCheckLg
                        className="check-icon"
                        title="Completed"
                        onClick={() => handleComplete(index)}
                      />
                      <AiOutlineEdit
                        className="edit-btn"
                        title="Edit"
                        onClick={() => handleEdit(index, item)}
                      />
                    </div>
                  </div>
                );
              }
            })}
          {status === true &&
            completedTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>completedOn:{item.completedOn}</small>
                    </p>
                  </div>

                  <div>
                    {/* <AiOutlineDelet className="delete-icon" /> */}
                    <AiOutlineDelete
                      className="delete-icon"
                      onClick={() => handlecompletedelete(index)}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default App;
