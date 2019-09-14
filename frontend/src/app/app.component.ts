import { Component, ViewContainerRef } from '@angular/core'
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router'
import { Title } from '@angular/platform-browser'
import { CurrentSetService } from './core/services/CurrentSetService/CurrentSetService'
import { SharedService } from './core/services/SharedService/SharedService'
import { SharedEventName } from './core/services/SharedService/models'

@Component({
    selector: 'app-root',
    template: '<router-outlet></router-outlet>',
    styles: [
        //require('loaders.css/src/loaders.css')
    ],
})
export class AppComponent {
    public title = 'app works!'
    public pageName = ''
    public shopId = 0

    public constructor(
        private viewContainerRef: ViewContainerRef,
        private router: Router,
        private titleService: Title,
        private activatedRoute: ActivatedRoute,
        private sharedService: SharedService,
    ) {
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map(route => {
                while (route.firstChild) route = route.firstChild
                return route
            })
            .filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data)
            .subscribe(event => {
                this.pageName = event['pageTitle']
                this.setTitle()
            })

        this.sharedService.currentMessage.subscribe(r => {
            if (r.name == SharedEventName.ShopChanged) {
                this.shopId = CurrentSetService.currentShop.id
                this.setTitle()
            }
        })
    }
    private setTitle(){
      this.title = `TakeDrop ${' | ' + this.pageName} ${' | ' + this.shopId}`
      this.titleService.setTitle(this.title)
    }
}
