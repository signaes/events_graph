import React from 'react';
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import { connect } from 'react-redux';
import TicketBatches from '../TicketBatches';
import actions from '../../redux/actions';

const query = gql`
  query eventOffer {
    event_offer(id:"lets-react-the-grand-tournament") {
      id
      name
      description
      photo {
        cover_url
      }
      address {
        name
        city
        state
        country
        street
      }
      ticket_offers {
        nodes {
          id
          name
          description
          batches {
            id
            number
            price
            purchaseable_quantities
            payment_methods {
              due_amount
              due_service_fee
              payment_type
            }
          }
        }
      }
    }
  }
`

const TicketsList = ({ ticketOffers, addTicketOffers }) => (
  <Query query={query}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error</p>;

      const { event_offer } = data;
      const { ticket_offers } = event_offer;
      const { nodes } = ticket_offers;

      if (ticketOffers.nodes.length === 0) {
        console.log('nodes', nodes)
        addTicketOffers(nodes);

        return <h1>Loading store ...</h1>
      }

      return (
        <div>
          {
            ticketOffers.nodes.map(node => <TicketBatches {...node} key={node.id} />)
          }
        </div>
      );
    }}
  </Query>
);

const mapStateToProps = state => ({
  ticketOffers: state.ticketOffers
});

console.log('actions', actions.ticketOffers.addTicketOffers([]))

const mapDispatchToProps = dispatch => ({
  addTicketOffers(nodes) {
    return dispatch(actions.ticketOffers.addTicketOffers(nodes));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketsList);
