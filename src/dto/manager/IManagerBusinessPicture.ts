import type {IBaseEntity} from "@/dto/management/IBaseEntity";
import type {IManagerProductPicture} from "@/dto/manager/IManagerProductPicture";
import type {IManagerPicture} from "@/dto/manager/IManagerPicture";

export interface IManagerBusinessPicture extends IBaseEntity {
    pictureId: string,
    picture: IManagerPicture,
    businessId: string,
}