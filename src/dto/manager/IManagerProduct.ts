import type {IBaseEntity} from "@/dto/management/IBaseEntity";
import type {IManagerInvoice} from "@/dto/manager/IManagerInvoice";
import type {IManagerBusiness} from "@/dto/manager/IManagerBusiness";
import type {IManagerProductCategory} from "@/dto/manager/IManagerProductCategory";
import type {IManagerInvoiceRow} from "@/dto/manager/IManagerInvoiceRow";
import type {IManagerProductPicture} from "@/dto/manager/IManagerProductPicture";
import type {IManagerProductTag} from "@/dto/manager/IManagerProductTag";

export interface IManagerProduct extends IBaseEntity {
    name: string
    description: string
    unitPrice: number
    unitDiscount: number
    unitCount: number
    taxPercent: number
    currency: string
    frozen: boolean
    productCategoryId: string
    productCategory: IManagerProductCategory
    businessId: string
}