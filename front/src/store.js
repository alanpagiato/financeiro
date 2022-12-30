import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import accountReducer from "./slices/accountSlice";
import paymentMethodReducer from "./slices/paymentMethodSlice";
import originReducer from "./slices/originSlice";
import destinyReducer from "./slices/destinySlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        account: accountReducer,
        paymentMethod: paymentMethodReducer,
        origin: originReducer,
        destiny: destinyReducer,
        
    },
});