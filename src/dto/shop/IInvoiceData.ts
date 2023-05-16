import type {IBaseEntity} from "@/dto/management/IBaseEntity";
import type {IOrder} from "@/dto/shop/IOrder";
import type {IInvoiceRowData} from "@/dto/shop/IInvoiceRowData";

export interface IInvoiceData extends IBaseEntity {
    finalTotalPrice: number
    taxPercent: number
    taxAmount: number
    totalPriceWithoutTax: number
    paymentCompleted: boolean
    businessId: string
    order: IOrder
    invoiceRowDatas: IInvoiceRowData []

}