import Todo from "./Todo";
import classNames from "classnames/bind";
import styles from "./TodoList.module.scss";
import { useRef, useState } from "react";

const cx = classNames.bind(styles);
function TodoList({
  onAddTodos,
  todos,
  onRemoveTodo,
  onCheckedTodo,
  onEditTodo,
}) {
  const [todo, setTodo] = useState("");
  const inputRef = useRef(null);

  const handleSetTodo = (e) => {
    const value = e.target.value;
    setTodo(value);
  };
  return (
    <div className={cx("todo-wrapper")}>
      <div className={cx("todo-container")}>
        <input
          value={todo}
          onChange={handleSetTodo}
          type="text"
          className={cx("todo-input")}
          spellCheck
          placeholder="Enter your plan for today"
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onAddTodos(todo, setTodo, inputRef);
            }
          }}
        />
        <button
          className={cx("btn-add")}
          onClick={() => onAddTodos(todo, setTodo, inputRef)}
        >
          Add
        </button>
      </div>
      <ul className={cx("todo-list")}>
        {todos.map(
          (todo) =>
            todo.hide && (
              <Todo
                key={todo.id}
                todo={todo}
                onRemoveTodo={onRemoveTodo}
                onCheckedTodo={onCheckedTodo}
                onEditTodo={onEditTodo}
              />
            )
        )}
      </ul>
    </div>
  );
}

export default TodoList;
