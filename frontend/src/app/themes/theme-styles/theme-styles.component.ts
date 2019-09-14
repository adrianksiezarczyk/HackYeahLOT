import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { ThemeService } from 'app/core/services/ThemeService/ThemeService'
import { BaseComponent } from 'app/core/base/base.component'
import { UsersService } from 'app/core/services/UsersService/UsersService';

@Component({
    selector: 'theme-styles',
    templateUrl: './theme-styles.component.html',
})
export class ThemeStylesComponent extends BaseComponent implements OnInit {
    @Input() themeArray: Array<any> = []
    @Output() private refresh: EventEmitter<any> = new EventEmitter()
    editMode = false

    constructor(private themeService: ThemeService,
        private usersService: UsersService) {
        super()
    }

    canUserChangeTheme() {
        return this.usersService.hasPermission('CanEditTheme')
    }

    ngOnInit() {}

    save() {
        this.showLoader()
        this.themeService.update(this.themeArray).subscribe(r => {
            this.refresh.emit()
            this.editMode = false
            this.hideLoader()
        }, this.handleError)
    }
    setDefaultTheme() {
        if (confirm('Na pewno chcesz przywrócić wszystkie ustawienia do domyślnych?')) {
            this.showLoader()
            this.themeService.setDefaultTheme().subscribe(r => {
                this.refresh.emit()
                this.hideLoader()
            }, this.handleError)
        }
    }

}
