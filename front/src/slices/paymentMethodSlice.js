import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paymentMethodService from "../services/paymentMethodService";

const initialState = {
    paymentMethods: [],
    error: false,
    success: false,
    loading: false,
    message: null,
}

// pega todos os dados da tabela
export const getPaymentMethods = createAsyncThunk(
    "paymentMethod/getAll",
    async (_, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await paymentMethodService.getPaymentMethods(token);
        
        // Check for errors
        if (data.errors) {
          return thunkAPI.rejectWithValue(data.errors[0]);
        }
    
        return data;
    }
);

// inserindo dados
export const insertPaymentMethod = createAsyncThunk(
    "paymentMethod/insert",
    async(paymentMethod, thunkApi) => {
        const token = thunkApi.getState().auth.user.token;
        const data = await paymentMethodService.insertPaymentMethod(paymentMethod, token);

        //check errors
        if(data.errors) {
            return thunkApi.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

// atualizando dados
export const updatePaymentMethod = createAsyncThunk(
    "paymentMethod/update",
    async(paymentMethod, thunkApi) => {
        const token = thunkApi.getState().auth.user.token;
        const data = await paymentMethodService.updatePaymentMethod(paymentMethod, paymentMethod.id, token);

        //check errors
        if(data.errors) {
            return thunkApi.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

// deleta registro
export const deletePaymentMethod = createAsyncThunk(
    "paymentMethod/delete",
    async(id, thunkApi) => {
        const token = thunkApi.getState().auth.user.token;
        const data = await paymentMethodService.deletePaymentMethod(id, token);

        //check errors
        if(data.errors) {
            return thunkApi.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

export const paymentMethodSlice = createSlice({
    name: "paymentMethod",
    initialState,
    reducers: {
        resetMessagePaymentMethod: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPaymentMethods.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getPaymentMethods.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.paymentMethods = action.payload;
            })
            .addCase(getPaymentMethods.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })
            .addCase(insertPaymentMethod.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(insertPaymentMethod.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.message = "Forma de pagamento criada com sucesso !"
            })
            .addCase(insertPaymentMethod.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })
            .addCase(updatePaymentMethod.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(updatePaymentMethod.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.message = "Forma de pagamento atualizada com sucesso !"
            })
            .addCase(updatePaymentMethod.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })
            .addCase(deletePaymentMethod.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(deletePaymentMethod.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.message = "Forma de pagamento excluída com sucesso !"
            })
            .addCase(deletePaymentMethod.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });
    },
});

export const { resetMessagePaymentMethod } = paymentMethodSlice.actions;
export default paymentMethodSlice.reducer;