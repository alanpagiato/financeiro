import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import originService from "../services/originService";

const initialState = {
    origins: [],
    error: false,
    success: false,
    loading: false,
    message: null,
}

// pega todos os dados da tabela
export const getOrigins = createAsyncThunk(
    "origin/getAll",
    async (_, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await originService.getOrigins(token);
        
        // Check for errors
        if (data.errors) {
          return thunkAPI.rejectWithValue(data.errors[0]);
        }
    
        return data;
    }
);

// inserindo dados
export const insertOrigin = createAsyncThunk(
    "origin/insert",
    async(origin, thunkApi) => {
        const token = thunkApi.getState().auth.user.token;
        const data = await originService.insertOrigin(origin, token);

        //check errors
        if(data.errors) {
            return thunkApi.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

// atualizando dados
export const updateOrigin = createAsyncThunk(
    "origin/update",
    async(origin, thunkApi) => {
        const token = thunkApi.getState().auth.user.token;
        const data = await originService.updateOrigin(origin, origin.id, token);

        //check errors
        if(data.errors) {
            return thunkApi.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

// deleta registro
export const deleteOrigin = createAsyncThunk(
    "origin/delete",
    async(id, thunkApi) => {
        const token = thunkApi.getState().auth.user.token;
        const data = await originService.deleteOrigin(id, token);

        //check errors
        if(data.errors) {
            return thunkApi.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

export const originSlice = createSlice({
    name: "origin",
    initialState,
    reducers: {
        resetMessageOrigin: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrigins.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getOrigins.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.origins = action.payload;
            })
            .addCase(getOrigins.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })
            .addCase(insertOrigin.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(insertOrigin.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.message = "Origem criada com sucesso !"
            })
            .addCase(insertOrigin.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })
            .addCase(updateOrigin.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(updateOrigin.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.message = "Origem atualizada com sucesso !"
            })
            .addCase(updateOrigin.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })
            .addCase(deleteOrigin.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(deleteOrigin.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.message = "Origem excluída com sucesso !"
            })
            .addCase(deleteOrigin.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });
    },
});

export const { resetMessageOrigin } = originSlice.actions;
export default originSlice.reducer;