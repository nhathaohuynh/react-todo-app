import classNames from "classnames/bind";
import styles from "./Todo.module.scss";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
import { AiOutlineFileDone } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";

const cx = classNames.bind(styles);
function Todo({ todo, onRemoveTodo, onCheckedTodo, onEditTodo }) {
  const [edit, setEdit] = useState(false);
  const { id, name, complete } = todo;
  const editRef = useRef(null);
  const textSaveRef = useRef(null)

  const handleEditTodo = () => {
    setEdit(!edit);
  };


  const handleClickSave = () => {
    const payload = textSaveRef.current.textContent
    setEdit(!edit)
    onEditTodo(id, payload)
  };
  useEffect(() => {
    if (edit) {
      editRef.current.focus();
    }
  },[edit]);

  return (
    <li
      className={cx("todo-item")}
      style={
        complete
          ? {
              opacity: "0.5",
              textDecoration: "line-through",
              pointerEvents: "none",
            }
          : {}
      }
      onBlur = {handleClickSave}
      contentEditable={edit}
      spellCheck={false}
      suppressContentEditableWarning={true}
      ref={editRef}
    >
      <p
        className={cx("todo-work")}
        ref ={textSaveRef}
      >
        {name}
      </p>
      <span className={cx("todo-icons")}>
        {edit ? (
          <AiOutlineFileDone
            className={cx("todo-icon")}
            onClick={handleClickSave}

          ></AiOutlineFileDone>
        ) : (
          <>
            <FaEdit
              className={cx("todo-icon")}
              onClick={handleEditTodo}
            ></FaEdit>
            <FaTrash
              className={cx("todo-icon")}
              onClick={() => onRemoveTodo(id)}
            ></FaTrash>
            <BsCheckCircleFill
              className={cx("todo-icon")}
              onClick={() => onCheckedTodo(id)}
            ></BsCheckCircleFill>
          </>
        )}
      </span>
    </li>
  );
}

export default Todo;
