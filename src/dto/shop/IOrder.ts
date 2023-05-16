import type {IBaseEntity} from "@/dto/management/IBaseEntity";

export interface IOrder extends IBaseEntity {
    startTime: Date
    givenToClientTime: Date
    accepted: boolean
    ready: boolean
    givenToClient: boolean
    customerComment: string
    invoiceId: string
}