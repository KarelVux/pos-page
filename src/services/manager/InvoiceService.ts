import {BaseEntityService} from '../base/BaseEntityService';
import type {IManagerInvoice} from "@/dto/manager/IManagerInvoice";
import type {IJWTResponse} from "@/dto/identity/IJWTResponse";

export class InvoiceService extends BaseEntityService<IManagerInvoice> {
    constructor() {
        super('/manager/invoices');
    }

    async getBusinessInvoices(jwtData: IJWTResponse, businessId: string): Promise<IManagerInvoice[] | undefined> {
        try {
            const response = await this.axios.get<IManagerInvoice[]>('',
                {
                    headers: {
                        'Authorization': 'Bearer ' + jwtData.jwt
                    },
                    params: {
                        businessId: businessId,
                    }
                }
            );

            console.log('response', response);
            if (response.status === 200) {
                return response.data;
            }

            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message, e);
            return undefined;
        }
    }
}