import {
  createSlice,
  createAsyncThunk,
  isAsyncThunkAction,
} from "@reduxjs/toolkit";
import postsService from "@/services/postsService";

export const getPosts = createAsyncThunk("posts/get", async () => {
  const posts = await postsService.getPosts();
  return posts.data;
});

export const createPost = createAsyncThunk(
  "posts/create",
  async ({ title, content }: { title: string; content: string }) => {
    const createdPost = await postsService.createPost(title, content);
    return createdPost.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/update",
  async ({
    id,
    title,
    content,
  }: {
    id: number;
    title: string;
    content: string;
  }) => {
    const updatedPost = await postsService.updatePost(id, title, content);
    return updatedPost.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/delete",
  async (id: number) => {
    const deletedPost = await postsService.deletePost(id);
    return deletedPost.data;
  }
);

export interface PostsState {
  posts: Post[];
  isLoading: boolean;
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(({ id }) => id != action.payload.id);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) => {
          if (post.id === action.payload.id) {
            return action.payload;
          }
          return post;
        });
      });
    //.addCase(createPost.fulfilled, (state, action) => {
    //  state.posts = [...state.posts, action.payload];
    //});
  },
});

export default postsSlice.reducer;
