import type {IBaseEntity} from "@/dto/management/IBaseEntity";
import type {IManagerInvoice} from "@/dto/manager/IManagerInvoice";
import type {IManagerOrder} from "@/dto/manager/IManagerOrder";
import type {IManagerBusiness} from "@/dto/manager/IManagerBusiness";

export interface IManagerSettlement extends IBaseEntity {
    Name: string
}