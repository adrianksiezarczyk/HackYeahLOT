import { Component, OnInit, ViewChild } from '@angular/core'
import 'rxjs/add/observable/zip'
import * as _ from 'lodash'
import { BaseComponent } from 'app/core/base/base.component'
import { ActivatedRoute, Router } from '@angular/router'
import { StoriesService } from 'app/core/services/StoriesService/StoriesService'

@Component({
    selector: 'stories-details-component',
    templateUrl: './stories.details.component.html',
})
export class StoriesDetailsComponent extends BaseComponent implements OnInit {
    story: any = {}
    @ViewChild('files') files
    public selectedFiles = []

    constructor(
        private storiesService: StoriesService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {
        super()
    }
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.init(params.id)
        })
    }

    init(id: any) {
        if (!id) return

        // this.showLoader()
        // //this.storiesService.get(id).subscribe(r => {
        // //  this.template = r
        // this.hideLoader()
        // //  }, this.handleError)
    }

    save() {
        this.showLoader()
        let promises = []
        for (var key in this.selectedFiles) {
            if (isNaN(parseInt(key))) continue
            promises.push(this.convertFileToBase64(this.selectedFiles[key]))
        }

        Promise.all(promises).then(r => {
            this.storiesService
                .add({
                    ...this.story,
                    images: r,
                })
                .subscribe(r => {
                    this.hideLoader()
                    this.router.navigate(['/stories'])
                }, this.handleError)
        })
    }

    onFilesAdded() {
        this.selectedFiles = this.files.nativeElement.files
    }

  
}
