import {ObjectId} from "mongodb"

export type FlightsModel = {
    _id?: ObjectId,
    origen: string,
    destino: string,
    fechaHora: string
}

export type Flights = {
    id: string,
    origen: string,
    destino: string,
    fechaHora: string
}
