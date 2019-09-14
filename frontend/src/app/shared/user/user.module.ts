import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LogoutComponent } from './logout/logout.component'
import { FormsModule } from '@angular/forms'

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [LogoutComponent],
    exports: [LogoutComponent],
})
export class UserModule {}
