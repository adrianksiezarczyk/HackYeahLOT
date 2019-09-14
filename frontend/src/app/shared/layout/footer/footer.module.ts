import { NgModule } from '@angular/core'
import { I18nModule } from '../../i18n/i18n.module'
import { FooterComponent } from './footer.component'

@NgModule({
    imports: [I18nModule],
    declarations: [FooterComponent],
    exports: [FooterComponent],
})
export class FooterModule {}
