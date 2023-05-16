import type {IBaseEntity} from "@/dto/management/IBaseEntity";

export interface IInvoiceRowData extends IBaseEntity {
    productName: string
    finalProductPrice: number
    productUnitCount: bigint
    productPricePerUnit: number
    productId: string
    currency: string
    comment: string
}