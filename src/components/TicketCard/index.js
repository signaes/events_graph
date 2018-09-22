import React from 'react';
import { connect } from 'react-redux';
import './styles.css';
import actions from '../../redux/actions';

const parsePrice = n => `R$ ${(n/100)}`;
const quantities = a => ['-'].concat(a);
const paymentMethodName = m => m === 'BANK_SLIP'
  ? 'Boleto Bancário'
  : m === 'CREDIT'
    ? 'Cartão de Crédito'
    : null;

const TicketCard = ({
  batch,
  description,
  id,
  name,
  selectBatch,
  selectPaymentMethod
}) => (
  <div className="ticket-card" data-available={batch.available}>
    <header className="ticket-card__header">
      <div className="ticket-card__header__content">
        <h2 className="ticket-card__title">{ name } - Lote { batch.number }</h2>
        <h3 className="ticket-card__price">
          { parsePrice(batch.price) }
        </h3>
      </div>
      <div className="ticket-card__header__control">
        { batch && batch.purchaseable_quantities
          ? (<div>
              <label htmlFor="quantity">Quantidade</label>
              <select
                id="quantity"
                onChange={e => selectBatch({
                  ticketId: id, batch, quantity: e.target.value
                })}>
                  { quantities(batch.purchaseable_quantities)
                    .map(n => (
                      <option value={n === '-' ? 0 : n} key={`${id}-q-${n}`}>{n}</option>
                    )) }
              </select>
            </div>)
            : null }
        { batch && batch.payment_methods
          ? (<div>
              <label htmlFor="payment-method">Forma de pagamento</label>
              <select
                id="payment-method"
                onChange={e => selectPaymentMethod({
                  ticketId: id, batch, paymentMethod: e.target.value
                })}>
                  { batch.payment_methods
                    .map(n => (
                      <option
                        value={n.payment_type}
                        key={`${id}-p-${n.payment_type}`}>
                        {paymentMethodName(n.payment_type)}
                      </option>
                    )) }
              </select>
            </div>)
            : null }
      </div>
    </header>
    <footer className="ticket-card__footer">
      <div>
        <a>Mostar descrição</a>
      </div>
      <p className="ticket-card__description">
        { description }
      </p>
    </footer>
  </div>
);

const mapDispatchToProps = dispatch => ({
  selectBatch({ ticketId, batch, quantity }) {
    return dispatch(actions.ticketOffers.selectBatch({ ticketId, batch, quantity }));
  },
  selectPaymentMethod({ ticketId, batch, paymentMethod }) {
    return dispatch(actions.ticketOffers.selectPaymentMethod({ ticketId, batch, paymentMethod }));
  },
});

export default connect(null, mapDispatchToProps)(TicketCard);
