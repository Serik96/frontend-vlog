import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts')

  return data
})

export const fetchPostsPopular = createAsyncThunk('posts/fetchPostsPopular', async () => {
  const { data } = await axios.get('/popular')
  return data
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/posts/tags')
  return data
})

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async id => {
  await axios.delete(`/posts/${id}`)
})

const initialState = {
  posts: {
    items: [],
    status: 'loading'
  },
  popularPosts: {
    items: [],
    status: 'loading'
  },
  tags: {
    items: [],
    status: 'loading'
  }
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    // получение статьи
    [fetchPosts.pending]: state => {
      state.posts.items = []
      state.posts.status = 'loading'
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload
      state.posts.status = 'loaded'
    },
    [fetchPosts.rejected]: state => {
      state.posts.items = []
      state.posts.status = 'error'
    },
    // получение популярных постов
    [fetchPostsPopular.pending]: state => {
      state.popularPosts.items = []
      state.popularPosts.status = 'loading'
    },
    [fetchPostsPopular.fulfilled]: (state, action) => {
      state.popularPosts.items = action.payload
      state.popularPosts.status = 'loaded'
    },
    [fetchPostsPopular.rejected]: state => {
      state.popularPosts.items = []
      state.popularPosts.status = 'error'
    },
    // получение тэгов
    [fetchTags.pending]: state => {
      state.tags.items = []
      state.tags.status = 'loading'
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload
      state.tags.status = 'loaded'
    },
    [fetchTags.rejected]: state => {
      state.tags.items = []
      state.tags.status = 'error'
    },
    // удаление поста
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg)
      state.popularPosts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg)
    }
  }
})

export const postsReducer = postsSlice.reducer
