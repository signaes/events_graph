let types = {};
const register = typeNames => typeNames.forEach(type => {
  types[type] = type;
});

// ticket_offers
register(['ADD_TICKET_OFFERS', 'SELECT_BATCH', 'SELECT_PAYMENT_METHOD']);


export default types;
