import {BaseEntityService} from '../base/BaseEntityService';
import type {IManagerBusiness} from "@/dto/manager/IManagerBusiness";
import type {IProduct} from "@/dto/shop/IProduct";
import type {IManagerProduct} from "@/dto/manager/IManagerProduct";

export class ProductService extends BaseEntityService<IManagerProduct> {
    constructor() {
        super('/manager/product');
    }
}