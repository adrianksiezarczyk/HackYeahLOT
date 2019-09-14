import { Injectable } from '@angular/core'
import { BaseService } from 'app/core/base/base.service'
import { ApiService } from 'app/core/api/api.service'
import { GetStoriesModel, StoryModel } from './models'
import { PaginationRequestModel, PaginationResponseModel } from 'app/core/base/models'

@Injectable()
export class StoriesService extends BaseService {
    constructor(private http: ApiService) {
        super()
    }

    get(request: PaginationRequestModel<GetStoriesModel>): any {
        const requestString = this.createSearchParams(request)
        return this.http.get<any>(`admin/stories?${requestString}`)
    }
    add(model) {
        return this.http.post<Response>('admin/stories', model)
    }
    udpate(model) {
        return this.http.put<Response>('admin/stories', model)
    }
    delete(id: number) {
        return this.http.delete<Response>(`admin/stories/${id}`)
    }
}
