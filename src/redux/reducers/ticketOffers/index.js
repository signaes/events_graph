import resolve from '../../resolve';
import types from '../../actions/types';

const {
  ADD_TICKET_OFFERS,
  SELECT_BATCH,
  SELECT_PAYMENT_METHOD,
} = types;

const initialState = {
  nodes: [],
  selected: {},
  paymentMethods: {},
};

const filterAvailableBatches = nodes => nodes
  .map(node => node)
  .map(node => {
      const { batches } = node;
      let availableBatchNumber = batches[0].number;

      batches.forEach(batch => {
        if (batch.number < availableBatchNumber) {
          availableBatchNumber = batch.number;
        }
      });

      node.batches = batches.map(batch => ({
        ...batch,
        available: availableBatchNumber === batch.number
      }));

      return node;
    }
  );

const addTicketOffers = (state, action) => {
  const nodes = filterAvailableBatches(action.payload.nodes)
    .map(node => ({
      ...node,
      batches: node.batches.map(b => ({
        ...b,
        chosenPaymentMethod: b.payment_methods[0]
      }))
    }));
  const paymentMethods = nodes
    .map(node => ({
      [node.id]: {
        batch: node.batches[0],
        paymentMethod: node.batches[0].payment_methods[0],
      }
    }));

  return {
    ...state,
    nodes,
    paymentMethods,
  };
};

const selectBatch = (state, { payload }) => {
  let newState = { ...state };
  const { ticketId, batch, quantity } = payload;

  newState.selected = {
    ...state.selected,
    [ticketId]: { batch, quantity }
  };

  return newState;
};

const selectPaymentMethod = (state, { payload }) => {
  let newState = { ...state };
  const { ticketId, batch, paymentMethod } = payload;
  const nodes = state.nodes.map(node => ({
    ...node,
    batches: node.batches.map(b => ({
      ...b,
      chosenPaymentMethod: b.id === batch.id
        ? b.payment_methods.filter(p => p.payment_type === paymentMethod)[0]
        : b.chosenPaymentMethod
    }))
  }));

  console.log('PAYMENT_METHOD_REDUCER', paymentMethod)
  console.log('PAYMENT_METHOD_REDUCER', nodes)


  newState.paymentMethods = {
    ...state.paymentMethods,
    [ticketId]: { batch, paymentMethod },
  };

  newState.nodes = nodes;

  return newState;
};

const ticketOffers = (state = initialState, action) =>
  resolve({
    state,
    action,
    reducers: {
      [ADD_TICKET_OFFERS]: () => addTicketOffers(state, action),
      [SELECT_BATCH]: () => selectBatch(state, action),
      [SELECT_PAYMENT_METHOD]: () => selectPaymentMethod(state, action),
    }
  });

export default ticketOffers;
