import React from 'react';
import TicketCard from '../TicketCard';

const TicketBatches = ({ batches, description, id, name }) => batches.length > 0
  ? batches.map((batch, i) => (
    <TicketCard
      batch={batch}
      description={description}
      id={id}
      key={`${i}-${id}`}
      name={name} />
  ))
  : null;

export default TicketBatches;
