import classNames from "classnames/bind";
import styles from "./TodoApp.module.scss";
import Search from "./Search";
import TodoList from "./TodoList";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const cx = classNames.bind(styles);
const setStorage = (todos) => {
  localStorage.setItem("Todos", JSON.stringify(todos));
};
const getStorage = () => {
  return JSON.parse(localStorage.getItem("Todos"));
};
function TodoApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [todos, setTodos] = useState(getStorage() || []);

  const handleAddTodos = (todo, setTodo, inputRef) => {
    const checkTodo = !!todo;
    const newTodo = {
      id: uuid(),
      name: todo.trim(),
      hide: true,
      complete: false,
    };
    if (checkTodo) {
      setTodos((prev) => {
        const newTodos = [...prev, newTodo];
        setStorage(newTodos);
        return newTodos;
      });
      setTodo("");
      inputRef.current.focus();
    }
  };
  const handleRemoveTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setStorage(newTodos);
    setTodos(newTodos);
  };

  const handleCheckedTodo = (id) => {
    setTodos((prev) => {
      const todoIdCheck = prev.findIndex((todo) => todo.id === id);
      const newTodos = JSON.parse(JSON.stringify(prev));
      newTodos[todoIdCheck] = { ...newTodos[todoIdCheck], complete: true };
      setStorage(newTodos);
      return newTodos;
    });
  };

  const handleEditTodo = (id, payload) => {
    setTodos((prev) => {
      const todoIdCheck = prev.findIndex((todo) => todo.id === id);
      const newTodos = JSON.parse(JSON.stringify(prev));
      newTodos[todoIdCheck] = { ...newTodos[todoIdCheck], name: payload };
      setStorage(newTodos);
      return newTodos;
    });
  };
  const handleRemoveAll = () => {
    const newTodos = [];
    setStorage(newTodos);
    setTodos(newTodos);
  };
  const handleSearchTodos = (status = "all", text = "") => {
    let newTodos = [];
    switch (status) {
      case "All":
        return setTodos(() => {
          newTodos = getStorage().reduce((total, currentTodo) => {
            if (!currentTodo.name.includes(text))
              currentTodo = { ...currentTodo, hide: false };
            return [...total, currentTodo];
          }, []);
          return newTodos;
        });
      case "Complete":
        return setTodos(() => {
          newTodos = getStorage().reduce((total, currentTodo) => {
            if (!currentTodo.complete && currentTodo.name.includes(text)) {
              currentTodo = { ...currentTodo, hide: false };
            }
            return [...total, currentTodo];
          }, []);
          return newTodos;
        });
      case "Pendding":
        return setTodos(() => {
          newTodos = getStorage().reduce((total, currentTodo) => {
            if (currentTodo.complete && currentTodo.name.includes(text)) {
              currentTodo = { ...currentTodo, hide: false };
            }
            return [...total, currentTodo];
          }, []);
          return newTodos;
        });
      default:
        throw new Error("invalid Status");
    }
  };

  const handleClickDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={cx("todo-app")}>
      <h1 className={cx("title")}>TODO APP</h1>

      <Search onSearchTodos={handleSearchTodos}></Search>

      <TodoList
        onAddTodos={handleAddTodos}
        todos={todos}
        onRemoveTodo={handleRemoveTodo}
        onCheckedTodo={handleCheckedTodo}
        onEditTodo={handleEditTodo}
      ></TodoList>
      <div className={cx("option-more")}>
        {/* <div className={cx("dark-light")} onClick={handleClickDarkMode}>
          <span
            className={cx("active")}
            style={
              darkMode
                ? { transform: "translate(40px,-50%)", right: "5px" }
                : {}
            }
          ></span>
        </div> */}
        <button className={cx("deleta-all")} onClick={handleRemoveAll}>
          Remove All
        </button>
      </div>
    </div>
  );
}

export default TodoApp;
