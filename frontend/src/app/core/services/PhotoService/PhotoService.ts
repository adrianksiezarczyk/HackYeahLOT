import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpService } from "app/core/api/http.service";
import { BaseService } from 'app/core/base/base.service';
import { ApiService } from 'app/core/api/api.service';
import { Response } from '@angular/http';

@Injectable()
export class PhotoService extends BaseService {

    constructor(private http: ApiService) {
        super();
    }

    delete(photoId: number): Observable<Response> {
        return this.http.delete<Response>(`admin/photo/${photoId}`);
    }
    setAsDefault(productId: number, photoId: number): Observable<Response> {
        return this.http.put<Response>(`admin/photo/setAsDefault/${productId}/${photoId}`,{});
    }
}