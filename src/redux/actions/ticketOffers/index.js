import types from '../types';

const {
  ADD_TICKET_OFFERS,
  SELECT_BATCH,
  SELECT_PAYMENT_METHOD,
} = types;

const ticketOffers = {
  addTicketOffers: nodes => ({
    type: ADD_TICKET_OFFERS,
    payload: { nodes }
  }),
  selectBatch: ({ ticketId, batch, quantity }) => ({
    type: SELECT_BATCH,
    payload: { ticketId, batch, quantity }
  }),
  selectPaymentMethod: ({ ticketId, batch, paymentMethod }) => ({
    type: SELECT_PAYMENT_METHOD,
    payload: { ticketId, batch, paymentMethod }
  })
};

export default ticketOffers;
