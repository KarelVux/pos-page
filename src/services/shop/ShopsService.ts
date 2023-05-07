import {BaseService} from "@/services/base/BaseService";
import type {IBusiness} from "@/dto/shop/IBusiness";

export interface IGetBusinessQueryParams {
    settlementId: string;
    businessCategoryId?: string;
}


export default class ShopsService extends BaseService {
    constructor() {
        super('v1/shops/');
    }


    async getBusinesses(jwt: string, params: IGetBusinessQueryParams): Promise<IBusiness | undefined> {
        try {

            console.log("gety business")
            const response = await this.axios.get<IBusiness>('GetBusinesses',
                {
                    headers: {
                        'Authorization': 'Bearer ' + jwt
                    },
                    params: {
                        settlementId: params.settlementId,
                        businessCategoryId: params.businessCategoryId,

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