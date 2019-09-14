import { StorageKeys } from "../services/StorageService/StorageKeys";
import { StorageService } from "../services/StorageService/StorageService";

export class BaseService {

    cache: any;
    //TODO: skonczyc cache
    protected createSearchParams(data: any, parent?: string): string {
        let params = '';
        for (let key in data) {
            if (typeof (data[key]) === 'object')
                params += this.createSearchParams(data[key], key);
            else
                params += `${parent ? `${parent}.${key}` : key}=${data[key]}&`;
        }
        return params;
    }
}