import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpService } from "app/core/api/http.service";
import { BaseService } from 'app/core/base/base.service';
import { ApiService } from 'app/core/api/api.service';
import { Response } from '@angular/http';
import { CurrencyModel } from './models';

@Injectable()
export class CurrencyService extends BaseService {

    private currenciesCache: Observable<Array<CurrencyModel>>;
    constructor(private http: ApiService) {
        super();
    }

    get(): Observable<Array<CurrencyModel>> {
        if (this.currenciesCache)
            return this.currenciesCache;
        this.currenciesCache = this.http.get<Array<CurrencyModel>>("admin/currency")
            .publishReplay(1)
            .refCount();

        return this.currenciesCache;
    }
}