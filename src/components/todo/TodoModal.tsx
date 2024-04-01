import Link from "next/link";
import { useSelector } from "react-redux";
import { selectedTodoItem } from "../../store/todo/todoStore";

type TodoModapProps = {
  onCloseModal: () => void;
};

export default function TodoModal(props: TodoModapProps) {
  const todoItem = useSelector(selectedTodoItem);

  if (todoItem === undefined) return <></>;

  return (
    <div className="modal-container">
      <div className="modal-item">id : {todoItem.id}</div>
      <div className="modal-item">제목 : {todoItem.title}</div>
      <div className="modal-item">
        작성일 :{" "}
        {`${new Date(todoItem.timeStamp).getFullYear()}-${
          new Date(todoItem.timeStamp).getMonth() + 1
        }-${new Date(todoItem.timeStamp).getDate()}`}
      </div>
      <Link
        href={{
          pathname: `/Todo/${todoItem.id}`,
          query: { todoItem: JSON.stringify(todoItem) },
        }}
        as={`/Todo/${todoItem.id}`}
      >
        <button>상세페이지 이동</button>
      </Link>
      <button onClick={props.onCloseModal}>모달닫기</button>
    </div>
  );
}
