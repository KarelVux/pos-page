import type {IBaseEntity} from "@/dto/management/IBaseEntity";
import type {IManagerProduct} from "@/dto/manager/IManagerProduct";

export interface IManagerInvoiceRow extends IBaseEntity {
    finalProductPrice: number
    productUnitCount: number
    productPricePerUnit: number
    taxPercent: number
    taxAmountFromPercent : number
    currency: string
    comment: string
    productId: string
    productName: string
    invoiceId: string
}