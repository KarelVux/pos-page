import { BaseEntityService } from '../base/BaseEntityService';
import type { ISettlement } from '@/dto/management/ISettlement';

export class SettlementsService extends BaseEntityService<ISettlement> {
    constructor() {
        super('v1/management/settlements');
    }
}