import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url =
  "https://api.elchocrud.pro/api/v1/0f51a71c11f0e4a36d35a6dc5e0bb118/TodoYouTude";

interface TodoYouTude {
  _id?: number;
  id:number
  songs: string;
  name: string;
  title: string;
  spots: string;
  img: string;
  filterSelect: string;
}

interface TodoPatch {
  id: number;
  songs: string;
  name: string;
  title: string;
  spots: string;
  img: string;
  filterSelect: string;
}

interface typeNewData {
  id: number;
  songs: string;
  name: string;
  title: string;
  img: string;
  filterSelect: string;
}

const initialState: {
  data: TodoYouTude[];
  loading: boolean;
  error: string | null;
} = {
  data: [],
  loading: false,
  error: null,
};

export const postYouTude = createAsyncThunk(
  "todo/postRequest",
  async (newData: typeNewData) => {
    try {
      const response = (await axios.post(url, newData)).data;
      if (response.status >= 400 || response.state >= 404) {
        throw new Error("Ошибка " + response.status);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchTodos = createAsyncThunk<TodoYouTude[]>(
  "todo/fetchTodos",
  async () => {
    try {
      const response = await axios.get(url);
      if (response.status >= 400 || response.status >= 404) {
        throw new Error("Ошибка запроса " + response.status);
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);
export const deleteRequest = createAsyncThunk(
  "todo/deleteItems",
  async (id: number) => {
    try {
      await axios.delete(`${url}/${id}`);
      return id;
    } catch (error) {
      console.error(error);
    }
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const patchRequest = <any>(
  createAsyncThunk(
    "todo/patchItems",
    async ({ id, songs, name, title, img }: TodoPatch) => {
      try {
        await axios.patch(`${url}/${id}`, { songs, name, title, img });
        return { id, songs, name, title, img };
      } catch (error) {
        console.error(error);
      }
    }
  )
);

const youTudeSlice = createSlice({
  name: "todoYouTude",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(postYouTude.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postYouTude.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postYouTude.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(patchRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(patchRequest.fulfilled, (state, action) => {
        state.loading = false;
        const todo = state.data.find((item) => item._id === action.payload.id);
        if (todo) {
          todo.songs = action.payload.songs;
          todo.name = action.payload.name;
          todo.title = action.payload.title;
          todo.spots = action.payload.spots;
          todo.img = action.payload.img;
        }
      })
      .addCase(patchRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const TodoRender = youTudeSlice.reducer;
