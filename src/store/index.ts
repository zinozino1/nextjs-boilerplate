// 전역상태 관련 파일은 해당 폴더에 작성합니다. 이 파일은 제거해도 됩니다.

import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "./todo/todoStore";

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
