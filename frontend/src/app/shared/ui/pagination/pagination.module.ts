import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgxPaginationModule } from 'ngx-pagination'
import { PaginationComponent } from 'app/shared/ui/pagination/pagination.component'
import { FormsModule } from '@angular/forms'
import { SmartadminInputModule } from 'app/shared/forms/input/smartadmin-input.module'
import { I18nModule } from 'app/shared/i18n/i18n.module'

@NgModule({
    imports: [CommonModule, NgxPaginationModule, FormsModule, SmartadminInputModule, I18nModule],
    declarations: [PaginationComponent],
    exports: [PaginationComponent],
})
export class PaginationModule {}
