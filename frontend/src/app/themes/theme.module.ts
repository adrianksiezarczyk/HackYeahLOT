import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { routing } from './theme.routing'
import { SmartadminModule } from '../shared/smartadmin.module'
import { ThemeComponent } from './theme.component'
import { ErrorBoxModule } from 'app/shared/ui/error-box/error.box.module'
import { LoaderModule } from 'app/shared/ui/loader/loader.module'
import { SmartadminEditorsModule } from 'app/shared/forms/editors/smartadmin-editors.module'
import { SmartadminFormsModule } from 'app/shared/forms/smartadmin-forms.module'
import { TabsModule, ModalModule } from 'ngx-bootstrap'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { SmartadminInputModule } from 'app/shared/forms/input/smartadmin-input.module'
import { ThemeStylesComponent } from './theme-styles/theme-styles.component'
import { ThemeLogoComponent } from './theme-logo/theme-logo.component'
import { ThemeBannerComponent } from './theme-banner/theme-banner.component'
import { ThemeMetaImageComponent } from './theme-meta-image/theme-meta-image.component'
import { NotAvailableModalComponent } from './not-available-modal/notAvailable.modal.component'

@NgModule({
    imports: [
        CommonModule,
        routing,
        SmartadminModule,
        ReactiveFormsModule,
        ErrorBoxModule,
        ModalModule,
        LoaderModule,
        SmartadminModule,
        SmartadminInputModule,
        FormsModule,
        TabsModule,
        SmartadminFormsModule,
        SmartadminEditorsModule,
    ],
    declarations: [
        ThemeComponent,
        ThemeLogoComponent,
        ThemeStylesComponent,
        ThemeBannerComponent,
        ThemeMetaImageComponent,
        NotAvailableModalComponent,
    ],
})
export class ThemeModule {}
