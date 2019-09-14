import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { BaseComponent } from '../../../core/base/base.component'
import { PhotoService } from '../../../core/services/PhotoService/PhotoService'

@Component({
    selector: 'photos-settings',
    templateUrl: './photos.component.html',
})
export class PhotosComponent extends BaseComponent implements OnInit {
    @Input()  product: any = {}
    @Output() private refresh: EventEmitter<any> = new EventEmitter<any>()

    constructor(private photoService: PhotoService) {
        super()
    }

    ngOnInit() {
        
    }
    deletePhoto(photo: any) {
        if (confirm('Na pewno chcesz usunąć zdjęcie?')) {
            this.showLoader()
            this.photoService.delete(photo.id).subscribe(r => {
                this.product.photos.splice(this.product.photos.indexOf(photo), 1)
                this.hideLoader()
            }, this.handleError)
        }
    }
    setAsDefault(photo) {
        this.photoService.setAsDefault(this.product.id, photo.id).subscribe(r => {
            this.product.photos.forEach(p => (p.default = false))
            this.product.photos[this.product.photos.indexOf(photo)].default = true
            this.hideLoader()
        }, this.handleError)
    }
}
