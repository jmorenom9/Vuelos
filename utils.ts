import { Flights, FlightsModel } from "./types.ts";

export const fromModelToFlight = (flightModel: FlightsModel): Flights => {
  return {
    id: flightModel._id!.toString(),
    origen: flightModel.origen,
    destino: flightModel.destino,
    fechaHora: flightModel.fechaHora
  };
};