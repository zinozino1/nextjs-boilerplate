import React, { ChangeEvent, MouseEvent, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoModal from "../../src/components/todo/TodoModal";
import {
  TodoType,
  addTodo,
  deleteTodo,
  editTodo,
  setSelectedTodo,
  todos,
} from "../../src/store/todo/todoStore";

type TodoListItemType = {
  todoItem: TodoType;
  onClickItem: () => void;
};

export default function Todo() {
  const dispatch = useDispatch();
  const todoList = useSelector(todos);

  const [todoTitle, setTodoTitle] = useState<string>("");
  const handleChangeTodoTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTodoTitle(e.target.value);
    },
    []
  );

  const [isModal, setIsModal] = useState<boolean>(false);

  const handleOpenItemModal = useCallback(() => {
    setIsModal(true);
  }, []);
  const handleCloseItemModal = useCallback(() => {
    setIsModal(false);
    dispatch(setSelectedTodo(undefined));
  }, []);

  const handleAddTodo = useCallback(() => {
    dispatch(
      addTodo({ id: Date.now(), title: todoTitle, timeStamp: Date.now() })
    );
    setTodoTitle("");
  }, [todoTitle, todoList]);

  return (
    <div className="todo-container">
      <div className="todo-header">
        <input
          type="text"
          onChange={handleChangeTodoTitle}
          placeholder="할일 작성"
          value={todoTitle}
        />
        <button onClick={handleAddTodo}>add</button>
      </div>
      <div className="todo-list-container">
        {todoList.map((item, index) => (
          <TodoListItem
            key={`${item.id}_${index}`}
            todoItem={item}
            onClickItem={handleOpenItemModal}
          />
        ))}
      </div>

      {/* modal 컴포넌트 */}
      {isModal && <TodoModal onCloseModal={handleCloseItemModal} />}
    </div>
  );
}

const TodoListItem = React.memo((props: TodoListItemType) => {
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(props.todoItem.title);
  const handleChangeEditTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEditTitle(e.target.value);
    },
    []
  );

  const handleEditTodo = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    setIsEdit(true);
  }, []);

  const handleDeleteTodo = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteTodo(props.todoItem.id));
  }, []);

  const handleSubmitEditTodo = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      dispatch(editTodo({ id: props.todoItem.id, title: editTitle }));
      setIsEdit(false);
    },
    [editTitle]
  );

  return (
    <div
      className="todo-list-item-container"
      onClick={() => {
        props.onClickItem();
        dispatch(setSelectedTodo(props.todoItem));
      }}
    >
      <div>id : {props.todoItem.id}</div>
      <div>
        작성일 :{" "}
        {`${new Date(props.todoItem.timeStamp).getFullYear()}-${
          new Date(props.todoItem.timeStamp).getMonth() + 1
        }-${new Date(props.todoItem.timeStamp).getDate()}`}
      </div>
      {isEdit ? (
        <input
          onChange={handleChangeEditTitle}
          onClick={(e) => e.stopPropagation()}
          defaultValue={props.todoItem.title}
        />
      ) : (
        <strong>제목 : {props.todoItem.title}</strong>
      )}
      <div className="item-btn-container">
        {isEdit ? (
          <button onClick={handleSubmitEditTodo}>완료</button>
        ) : (
          <button onClick={handleEditTodo}>수정</button>
        )}
        <button onClick={handleDeleteTodo}>삭제</button>
      </div>
    </div>
  );
});
