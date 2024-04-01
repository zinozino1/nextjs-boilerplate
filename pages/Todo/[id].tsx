import { useRouter } from "next/router";

export default function TodoDetail() {
  const router = useRouter();

  const item = JSON.parse(router.query.todoItem as string);

  return (
    <div>
      <div>id : {item.id}</div>
      <div>제목 : {item.title}</div>
      <div>
        작성일 :{" "}
        {`${new Date(item.timeStamp).getFullYear()}-${
          new Date(item.timeStamp).getMonth() + 1
        }-${new Date(item.timeStamp).getDate()}`}
      </div>
    </div>
  );
}
