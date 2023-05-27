import type {IBaseEntity} from "@/dto/management/IBaseEntity";
import type {IManagerInvoice} from "@/dto/manager/IManagerInvoice";
import type {IManagerBusinessPicture} from "@/dto/manager/IManagerBusinessPicture";
import type {IManagerProductPicture} from "@/dto/manager/IManagerProductPicture";

export interface IManagerPicture extends IBaseEntity {
    title: string
    description: string
    path: string
    businessPictures : IManagerBusinessPicture
    productPictures: IManagerProductPicture
}