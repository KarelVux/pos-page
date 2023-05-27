import type {IBaseEntity} from "@/dto/management/IBaseEntity";
import type {IManagerInvoice} from "@/dto/manager/IManagerInvoice";
import type {IManagerProduct} from "@/dto/manager/IManagerProduct";

export interface IManagerProductCategory extends IBaseEntity {
    title: string
}