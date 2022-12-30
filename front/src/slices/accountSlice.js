import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import accountService from "../services/accountService";

const initialState = {
    accounts: [],
    account: [],
    error: false,
    success: false,
    loading: false,
    message: null,
}

// pega todas as contas
export const getAccounts = createAsyncThunk(
    "account/getAll",
    async (_, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await accountService.getAccounts(token);
        
        // Check for errors
        if (data.errors) {
          return thunkAPI.rejectWithValue(data.errors[0]);
        }
    
        return data;
    }
);

// insere nova conta
export const insertAccount = createAsyncThunk(
    "account/insert",
    async(account, thunkApi) => {
        const token = thunkApi.getState().auth.user.token;

        const data = await accountService.insertAccount(account, token);

        //check errors
        if(data.errors) {
            return thunkApi.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

// atualiza conta
export const updateAccount = createAsyncThunk(
    "account/update",
    async(account, thunkApi) => {
        const token = thunkApi.getState().auth.user.token;
        const data = await accountService.updateAccount(account, account.id, token);

        //check errors
        if(data.errors) {
            return thunkApi.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

// deleta conta
export const deleteAccount = createAsyncThunk(
    "account/delete",
    async(id, thunkApi) => {
        const token = thunkApi.getState().auth.user.token;
        const data = await accountService.deleteAccount(id, token);

        //check errors
        if(data.errors) {
            return thunkApi.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        resetMessageAccount: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAccounts.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getAccounts.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.accounts = action.payload;
            })
            .addCase(getAccounts.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })
            .addCase(insertAccount.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(insertAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.account = action.payload;
                state.message = "Conta criada com sucesso !"
            })
            .addCase(insertAccount.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })
            .addCase(updateAccount.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(updateAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.account = action.payload;
                state.message = "Conta atualizada com sucesso !"
            })
            .addCase(updateAccount.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })
            .addCase(deleteAccount.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(deleteAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.message = "Conta excluída com sucesso !"
            })
            .addCase(deleteAccount.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });
    },
});

export const { resetMessageAccount } = accountSlice.actions;
export default accountSlice.reducer;