import { firebaseAuth } from '@/lib/firebase';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

interface IUserState {
  user: {
    email: string | null;
  };
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

interface ICredential {
  email: string;
  password: string;
}

const initialState: IUserState = {
  user: {
    email: null,
  },
  isLoading: false,
  isError: false,
  error: null,
};

export const createUser = createAsyncThunk(
  'user/createUser',
  async ({ email, password }: ICredential) => {
    const data = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    return data.user.email;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: ICredential) => {
    const data = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    return data.user.email;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string | null>) => {
      state.user.email = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // For Create User
    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = '';
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user.email = action.payload;
      state.isError = false;
      state.error = '';
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user.email = null;
      state.isError = true;
      state.error = action.error.message!;
    });

    // For Signin user
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = '';
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user.email = action.payload;
      state.isError = false;
      state.error = '';
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user.email = null;
      state.isError = true;
      state.error = action.error.message!;
    });
  },
});

export const { setUser, setLoading } = userSlice.actions;

export default userSlice.reducer;
