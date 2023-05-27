import type {IBaseEntity} from "@/dto/management/IBaseEntity";
import type {IManagerInvoice} from "@/dto/manager/IManagerInvoice";
import type {IManagerOrder} from "@/dto/manager/IManagerOrder";
import type {IManagerPicture} from "@/dto/manager/IManagerPicture";
import type {IManagerProduct} from "@/dto/manager/IManagerProduct";

export interface IManagerProductPicture extends IBaseEntity {
    pictureId: string
    picture: IManagerPicture
    productId: string
    product: IManagerProduct
}