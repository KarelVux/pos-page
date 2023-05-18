import {BaseService} from "@/services/base/BaseService";
import type {IJWTResponse} from "@/dto/identity/IJWTResponse";
import type {ICreateEditInvoice} from "@/dto/shop/ICreateEditInvoice";
import type {IInvoice} from "@/dto/shop/IInvoice";

export interface IGetBusinessQueryParams {
    settlementId: string;
    businessCategoryId?: string;
}


export default class InvoicesService extends BaseService {
    constructor() {
        super('v1/public/invoices/');
    }


    async createInvoice(jwtData: IJWTResponse, createEditInvoice: ICreateEditInvoice): Promise<ICreateEditInvoice | undefined> {
        try {
            const response = await this.axios.post<ICreateEditInvoice>(`CreateInvoice`, createEditInvoice,
                {
                    headers: {
                        'Authorization': 'Bearer ' + jwtData.jwt
                    }
                }
            );

            if (response.status === 201) {
                return response.data;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }
    async getInvoice(jwtData: IJWTResponse, invoiceId: string): Promise<IInvoice | undefined> {
        try {
            const response = await this.axios.get<IInvoice>(`GetInvoice/${invoiceId}`,
                {
                    headers: {
                        'Authorization': 'Bearer ' + jwtData.jwt
                    }
                }
            );

            console.log('register response', response);
            if (response.status === 200) {
                return response.data;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }

}