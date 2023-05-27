import type {IBaseEntity} from "@/dto/management/IBaseEntity";
import type {IManagerInvoice} from "@/dto/manager/IManagerInvoice";
import type {IManagerInvoiceRow} from "@/dto/manager/IManagerInvoiceRow";
import type {IManagerOrderFeedback} from "@/dto/manager/IManagerOrderFeedback";

export interface IManagerOrder extends IBaseEntity {
    startTime: Date
    givenToClientTime : Date
    accepted: boolean
    ready: boolean
    givenToClient: boolean
    customerComment: string
    invoiceId: string
    invoice: IManagerInvoice
    orderFeedback: IManagerOrderFeedback
}