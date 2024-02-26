import { configureStore } from "@reduxjs/toolkit";
import { TodoRender } from "./tools/todoSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    todo: TodoRender,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type useDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
