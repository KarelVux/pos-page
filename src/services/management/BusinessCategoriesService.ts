import { BaseEntityService } from '../base/BaseEntityService';
import type {IBusinessCategory} from "@/dto/shop/IBusinessCategory";

export class BusinessCategoriesService extends BaseEntityService<IBusinessCategory> {
    constructor() {
        super('v1/management/BusinessCategories');
    }
}