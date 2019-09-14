import { Component, OnInit } from '@angular/core'
import { AuthService } from 'app/core/services/AuthService/AuthService'
import { StorageService } from 'app/core/services/StorageService/StorageService'
import { ShopSetModel, ShopModel } from 'app/core/services/AuthService/models'
import { SharedService } from 'app/core/services/SharedService/SharedService'
import { StorageKeys } from 'app/core/services/StorageService/StorageKeys'
import { SharedEventName } from 'app/core/services/SharedService/models'
import { Router } from '@angular/router'
import { ShopsService } from '../../../core/services/ShopsService/ShopsService'
import { CurrentSetService } from '../../../core/services/CurrentSetService/CurrentSetService'
import { Title } from '@angular/platform-browser'
import { StatisticsService } from 'app/core/services/StatisticsService/StatisticsService'
import {CurrentSetValidity} from '../../../core/services/CurrentSetValidity/CurrentSetValidity'

declare var $
const DAY_IN_MS = 1000 * 60 * 60 * 24

@Component({
    selector: 'sa-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
    user: any
    selectedShop: ShopModel = <ShopModel>{}
    sharedSubscription: any
    isSuperAdmin = false
    permissions = []
    selectedShopId: number
    shops = []
    updateStatistics: any = {}

    isValidWarning = false
    text = null
    alertType = null

    constructor(
        private sharedService: SharedService,
        private authService: AuthService,
        private router: Router,
        private shopsService: ShopsService,
        private statisticsService: StatisticsService,
        private titleService: Title,
    ) {
        this.user = {}
        this.permissions = StorageService.getItem(StorageKeys.permissions)
        if (this.permissions) this.isSuperAdmin = StorageService.getItem(StorageKeys.permissions).includes('SuperAdmin')
    }

    ngOnInit() {
        this.user.userName = StorageService.getItem(StorageKeys.email)
        this.shops = StorageService.getItem(StorageKeys.shops)
        if (!this.shops || this.shops.length == 0) {
            this.authService.logout()
            return
        }

        this.shopsService.getUserShopsDetails().subscribe(r => {
            this.selectedShop = r[0]
            this.shops = r
            CurrentSetService.updateCurrentShop(this.selectedShop)
            setTimeout(() => {
                this.sharedService.emitMessage({ name: SharedEventName.ShopChanged })
            }, 300)

            this.shopsService.getAccountValidity().subscribe(response => {
                if (response.planValidityDateTo) {
                    const now = new Date()
                    const expirationDate = new Date(response.planValidityDateTo)
                    this.valididateAccount(expirationDate)
                    //debugger
                    if (now > expirationDate && now.getTime() - expirationDate.getTime() > DAY_IN_MS * 7) {
                        CurrentSetValidity.updateValidity(false)
                        setTimeout(() => {
                            this.sharedService.emitMessage({ name: SharedEventName.AccountValidChanged })
                        }, 100)
                        //localStorage.setItem('isValid', false.toString())
                        if (window.location.pathname != '/profile') window.location.pathname = '/profile'
                    } else CurrentSetValidity.updateValidity(true)//localStorage.setItem('isValid', true.toString())
                }
            })

            if (this.canSeeUpdateStatisitcs()) this.getUpdateStatistic()
        })
    }

    getMsTimeInDays = msTime => new Date(msTime).getDate()
    valididateAccount = validityDate => {
        const accountValidity = validityDate
        if (!accountValidity) return null

        const planValidity = new Date(accountValidity)
        const now = new Date()

        let text = ''
        let alertType = 'warning'

        if (planValidity.getTime() - now.getTime() > DAY_IN_MS * 7) return null
        else if (now > planValidity && now.getTime() - planValidity.getTime() < DAY_IN_MS * 7) {
            const planValidityIn7 = planValidity
            planValidityIn7.setDate(planValidityIn7.getDate() + 7)
            alertType = 'danger'
            text = 'Masz'
            text += ` ${this.getMsTimeInDays(planValidityIn7.getTime() - now.getTime())} `
            text += 'dni, żeby zapłacić fakturę lub Twój sklep zostanie zamknięty.'
        } else if (now > planValidity && now.getTime() - planValidity.getTime() >= DAY_IN_MS * 7) {
            alertType = 'danger'
            text = 'Twój sklep jest wyłączony. Aby go ponownie uruchomić, zapłać fakturę'
        } else {
            alertType = 'warning'
            text = 'Masz'
            text += ` ${this.getMsTimeInDays(planValidity.getTime() - now.getTime())} `
            text += 'dni, żeby zapłacić fakturę za korzystanie z panelu.'
        }
        this.isValidWarning = true
        this.text = text
        this.alertType = alertType
        console.log(text, alertType)
    }

    canSeeUpdateStatisitcs() {
        if (this.permissions) return this.permissions.includes('CanUpdateGlobalProduct')
    }

    getUpdateStatistic() {
        this.updateStatistics = {}

        this.statisticsService.getUpdateStatistics().subscribe(r => {
            this.updateStatistics = r
        })
    }

    shopChanged(event) {
        console.log('shop')
        this.selectedShop = this.shops.find(s => s.id == this.selectedShopId)
        CurrentSetService.updateCurrentShop(this.selectedShop)
        this.sharedService.emitMessage({ name: SharedEventName.ShopChanged })
    }

    logout() {
        this.authService.logout()
    }
    goToProfile() {
        this.router.navigate(['/profile'])
    }

    ngOnDestroy(): void {
        if (this.sharedSubscription) this.sharedSubscription.unsubscribe()
    }
}
