import { BaseEntityService } from '../base/BaseEntityService';
import type {IProductCategory} from "@/dto/shop/IProductCategory";

export class ProductCategoriesService extends BaseEntityService<IProductCategory> {
    constructor() {
        super('v1/management/productCategories');
    }
}