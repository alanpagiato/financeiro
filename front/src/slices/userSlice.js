import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import userService from "../services/userService";

const initialState = {
    users: null,
    error:false,
    loading: false,
    success: false,
    message: null
};

// registra o usuario
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkApi) => {
    const token = thunkApi.getState().auth.user.token;
    const data = await userService.register(user, token);

    // Check for errors
    if (data.errors) {
      return thunkApi.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// pega dados de um usuario pelo id
export const getUserById = createAsyncThunk(
    "user/getById", 
    async (user, thunkApi) => {
        const token = thunkApi.getState().auth.user.token;
        const data = await userService.getUserById(user.id, token);

        return data;
    }
);

// pega dados dos usuarios
export const getUsers = createAsyncThunk(
  "user/get",
  async (_, thunkApi) => {
      const token = thunkApi.getState().auth.user.token;
      const data = await userService.getUsers(token);
      return data;
  }
);

// Update user details
export const updateUser = createAsyncThunk(
    "user/update",
    async (user, thunkApi) => {
      const token = thunkApi.getState().auth.user.token;
      const data = await userService.updateUser(user, user.id, token);
      
      // Check for errors
      if (data.errors) {
        return thunkApi.rejectWithValue(data.errors[0]);
      }
  
      return data;
    }
);

// deleta usuario
export const deleteUser = createAsyncThunk(
  "user/delete",
  async(id, thunkApi) => {
      const token = thunkApi.getState().auth.user.token;
      const data = await userService.deleteUser(id, token);

      //check errors
      if(data.errors) {
          return thunkApi.rejectWithValue(data.errors[0]);
      }

      return data;
  }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetMessageUser: (state) => {
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.message = "Usuário registrado com sucesso!";
          })
          .addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
          })
          .addCase(getUserById.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getUserById.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
          })
          .addCase(getUserById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
          })
          .addCase(getUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.users = action.payload;
          })
          .addCase(getUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.users = null;
            state.success = false;
          })
          .addCase(updateUser.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.message = "Usuário atualizado com sucesso!";
          })
          .addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
          })
          .addCase(deleteUser.pending, (state) => {
            state.loading = true;
            state.error = false;
          })
          .addCase(deleteUser.fulfilled, (state, action) => {
              state.loading = false;
              state.success = true;
              state.error = null;
              state.message = "Usuário excluído com sucesso !"
          })
          .addCase(deleteUser.rejected, (state, action) => {
              state.loading = false;
              state.success = false;
              state.error = action.payload;
          });
    },
});

export const {resetMessageUser} = userSlice.actions;
export default userSlice.reducer;
