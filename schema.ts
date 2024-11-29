export const schema = `#graphql

    type Flights {
        id: ID!
        origen: String!
        destino: String!
        fechaHora: String!
    }

    type Query {
        getFlights(origen: String, destino: String): [Flights!]
        getFlight(id: ID!): Flights!
    }

    type Mutation {
        addFlight(origen: String!, destino: String!, fechaHora: String!): Flights!
    }

`