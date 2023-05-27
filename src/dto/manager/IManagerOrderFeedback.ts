import type {IBaseEntity} from "@/dto/management/IBaseEntity";
import type {IManagerInvoice} from "@/dto/manager/IManagerInvoice";
import type {IManagerOrder} from "@/dto/manager/IManagerOrder";

export interface IManagerOrderFeedback extends IBaseEntity {
    title: string
    description: string
    rating: number
    orderId: string
    order: IManagerOrder
}