import type {IBaseEntity} from "@/dto/management/IBaseEntity";
import type {IManagerInvoice} from "@/dto/manager/IManagerInvoice";
import type {IManagerOrder} from "@/dto/manager/IManagerOrder";
import type {IManagerProduct} from "@/dto/manager/IManagerProduct";

export interface IManagerProductTag extends IBaseEntity {
    name: string
    productId: string
    product: IManagerProduct
}