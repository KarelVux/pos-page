import type {IBaseEntity} from '@/dto/management/IBaseEntity';
import type {IProductCategory} from "@/dto/shop/IProductCategory";

export interface IProduct extends IBaseEntity {
    name: string,
    description: string,
    unitPrice: number,
    unitDiscount: number,
    userSelectedProductCount: bigint,
    unitCount: bigint,
    currency: string,
    frozen: boolean,
    productCategoryId: string,
    productCategory: IProductCategory,
    businessId: string,
    TaxPercent: number,
}