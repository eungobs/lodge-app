import { SET_BOOKING_DETAILS, SET_PAYMENT_METHOD, COMPLETE_PAYMENT } from '../actions/bookingActions';

const initialState = {
  bookingDetails: null,
  paymentMethod: 'bankTransfer',
  paymentStatus: null,
};

export const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKING_DETAILS:
      return {
        ...state,
        bookingDetails: action.payload,
      };
    case SET_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case COMPLETE_PAYMENT:
      return {
        ...state,
        paymentStatus: action.payload,
      };
    default:
      return state;
  }
};
