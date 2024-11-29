import { Collection, ObjectId } from "mongodb";
import { Flights, FlightsModel } from "./types.ts";
import { fromModelToFlight } from "./utils.ts";

export const resolvers = {
    Query: {
        getFlights: async (_: unknown, { origen, destino }: { origen: string, destino: string }, context: { FlightsCollection: Collection<FlightsModel> }): Promise<Flights | null> => {
            const flightModel = await context.FlightsCollection.find({
                $or: [{ origen: origen }, { destino: destino }]
              }).toArray();
              
              if (!flightModel || flightModel.length === 0) {
                return null;
              } else {
                return fromModelToFlight(flightModel);
              }
                      
        },

        getFlight: async (_: unknown, { id }: { id: string }, context: { FlightsCollection: Collection<FlightsModel>; }): Promise<Flights | null> => {
            const flightsModel = await context.FlightsCollection.findOne({
              _id: new ObjectId(id),
            });
            if (!flightsModel) {
              return null;
            }
            return fromModelToFlight(flightsModel);
        }
    },

    Mutation: {
        addFlight: async (
            _: unknown,
            args: { origen: string; destino: string; fechaHora: string },
            context: {
              FlightsCollection: Collection<FlightsModel>;
            },
          ): Promise<Flights> => {
            const { origen, destino, fechaHora } = args;
            const { insertedId } = await context.FlightsCollection.insertOne({
              origen,
              destino,
              fechaHora
            });
            const flightModel = {
              _id: insertedId,
              origen,
              destino,
              fechaHora
            };
            return fromModelToFlight(flightModel!);
          },
    }
}