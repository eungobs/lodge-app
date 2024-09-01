export const SET_BOOKING_DETAILS = 'SET_BOOKING_DETAILS';
export const SET_PAYMENT_METHOD = 'SET_PAYMENT_METHOD';
export const COMPLETE_PAYMENT = 'COMPLETE_PAYMENT';

export const setBookingDetails = (details) => ({
  type: SET_BOOKING_DETAILS,
  payload: details,
});

export const setPaymentMethod = (method) => ({
  type: SET_PAYMENT_METHOD,
  payload: method,
});

export const completePayment = (status) => ({
  type: COMPLETE_PAYMENT,
  payload: status,
});

