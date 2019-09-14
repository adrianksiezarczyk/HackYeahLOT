import { Component, ViewChild } from '@angular/core'
import { BaseModalComponent } from 'app/core/base/base.modal.component'
import { ShopsService } from '../../core/services/ShopsService/ShopsService'
import { OfferService } from '../../core/services/OfferService/OfferService';

declare var $

@Component({
    selector: 'offer-details-modal-component',
    templateUrl: './offer.details.modal.component.html',
})
export class OfferDetailsModalComponent extends BaseModalComponent {
    offer: any = {}
    shops: any = []
    @ViewChild('imageFile') imageFile

    constructor(private shopService: ShopsService, private offerService: OfferService) {
        super()
    }

    init(parameter: any): void {
        this.offer = {}
        this.offer = Object.assign({}, parameter)
        this.showLoader()
        this.shopService.getAll().subscribe(r => {
            this.shops = r
            this.show()
            setTimeout(() => {
                $('#tags-details-select').select2({ tags: true, data: this.offer.tags }).val(this.offer.tags)
                setTimeout(() => {
                    $('#tags-details-select')
                        .select2({tags: true})
                        .trigger('update')
                    $('.select2-container').css('border', '1px solid #ccc')
                    this.hideLoader()
                })
            })
        })
    }

    save() {
        let file = this.imageFile.nativeElement.files[0]
        if (file) {
            this.convertFileToBase64(file).then(data => {
                this.showLoader()
                console.log(data)
                let model = Object.assign({}, this.offer)
                model.imageName = data.name
                model.imageFile = data.data
                let tags = $('#tags-details-select')
                    .select2('data')
                    .map(d => d.text)
                model.tags = tags
                console.log(model)

                this.offerService.update(model).subscribe(r => {
                    console.log(r)
                    this.hideLoader()
                    this.hide()
                }, this.handleError)

                // this.shopsService
                //     .saveCurrentShopLogo({
                //         fileName: file.name,
                //         file: data.data,
                //     })
                //     .subscribe(r => {
                //         this.refresh.emit()
                //         this.hideLoader()
                //     }, this.handleError)
            })
        } else {
            let model = Object.assign({}, this.offer)
            let tags = $('#tags-details-select')
                .select2('data')
                .map(d => d.text)
            model.tags = tags
            console.log(model)
            this.offerService.update(model).subscribe(r => {
                console.log(r)
                this.hideLoader()
                this.hide()
            }, this.handleError)
        }
    }
}
