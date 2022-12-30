// Redux
import { resetMessageAccount } from "../slices/accountSlice";
import { resetMessagePaymentMethod } from "../slices/paymentMethodSlice";
import { resetMessageUser } from "../slices/userSlice";
import { resetMessageOrigin } from "../slices/originSlice";
import { resetMessageDestiny } from "../slices/destinySlice";

export const useResetComponentMessageAccount = (dispatch) => {
  return () => {
    setTimeout(() => {
      dispatch(resetMessageAccount());
    }, 800);
  };
};

export const useResetComponentMessagePaymentMethod = (dispatch) => {
  return () => {
    setTimeout(() => {
      dispatch(resetMessagePaymentMethod());
    }, 800);
  };
};

export const useResetComponentMessageUser = (dispatch) => {
  return () => {
    setTimeout(() => {
      dispatch(resetMessageUser());
    }, 800);
  };
};

export const useResetComponentMessageOrigin = (dispatch) => {
  return () => {
    setTimeout(() => {
      dispatch(resetMessageOrigin());
    }, 800);
  };
};

export const useResetComponentMessageDestiny = (dispatch) => {
  return () => {
    setTimeout(() => {
      dispatch(resetMessageDestiny());
    }, 800);
  };
};