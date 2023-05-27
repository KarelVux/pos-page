import type {IBaseEntity} from "@/dto/management/IBaseEntity";
import type {IManagerOrder} from "@/dto/manager/IManagerOrder";
import type {IManagerInvoiceRow} from "@/dto/manager/IManagerInvoiceRow";

export interface IManagerInvoice extends IBaseEntity {
    finalTotalPrice: number,
    taxAmount: number,
    totalPriceWithoutTax: number,
    paymentCompleted: boolean,
    userAccepted: boolean,
    creationTime: Date
    appUserId: string
    businessId: string
    orderId: string
    order: IManagerOrder
    invoiceRows: IManagerInvoiceRow[]
}