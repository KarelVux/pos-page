import type {IBaseEntity} from "@/dto/management/IBaseEntity";
import type {IOrder} from "@/dto/shop/IOrder";
import type {IInvoiceRow} from "@/dto/shop/IInvoiceRow";

export interface IInvoice extends IBaseEntity {
    finalTotalPrice: number
    taxPercent: number
    taxAmount: number
    totalPriceWithoutTax: number
    paymentCompleted: boolean
    businessId: string
    order: IOrder
    invoiceRows: IInvoiceRow []

}