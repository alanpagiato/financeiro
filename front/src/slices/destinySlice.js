import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import destinyService from "../services/destinyService";

const initialState = {
    destinys: [],
    error: false,
    success: false,
    loading: false,
    message: null,
}

// pega todos os dados da tabela
export const getDestinys = createAsyncThunk(
    "destiny/getAll",
    async (_, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await destinyService.getDestinys(token);
        
        // Check for errors
        if (data.errors) {
          return thunkAPI.rejectWithValue(data.errors[0]);
        }
    
        return data;
    }
);

// inserindo dados
export const insertDestiny = createAsyncThunk(
    "destiny/insert",
    async(destiny, thunkApi) => {
        const token = thunkApi.getState().auth.user.token;
        const data = await destinyService.insertDestiny(destiny, token);

        //check errors
        if(data.errors) {
            return thunkApi.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

// atualizando dados
export const updateDestiny = createAsyncThunk(
    "destiny/update",
    async(destiny, thunkApi) => {
        const token = thunkApi.getState().auth.user.token;
        const data = await destinyService.updateDestiny(destiny, destiny.id, token);

        //check errors
        if(data.errors) {
            return thunkApi.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

// deleta registro
export const deleteDestiny = createAsyncThunk(
    "destiny/delete",
    async(id, thunkApi) => {
        const token = thunkApi.getState().auth.user.token;
        const data = await destinyService.deleteDestiny(id, token);

        //check errors
        if(data.errors) {
            return thunkApi.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

export const destinySlice = createSlice({
    name: "destiny",
    initialState,
    reducers: {
        resetMessageDestiny: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDestinys.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getDestinys.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.destinys = action.payload;
            })
            .addCase(getDestinys.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })
            .addCase(insertDestiny.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(insertDestiny.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.message = "Destino criado com sucesso !"
            })
            .addCase(insertDestiny.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })
            .addCase(updateDestiny.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(updateDestiny.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.message = "Destino atualizado com sucesso !"
            })
            .addCase(updateDestiny.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })
            .addCase(deleteDestiny.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(deleteDestiny.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.message = "Destino excluído com sucesso !"
            })
            .addCase(deleteDestiny.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });
    },
});

export const { resetMessageDestiny } = destinySlice.actions;
export default destinySlice.reducer;