import type IInvoiceCreateEditProduct from "@/dto/shop/IInvoiceCreateEditProduct";

export  interface ICreateEditInvoice {
    id?: string
    businessId?: string;
    InvoiceCreateEditProducts: IInvoiceCreateEditProduct[];
}