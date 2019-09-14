import { Component, OnInit, OnDestroy } from '@angular/core';
import { StatisticsService } from '../core/services/StatisticsService/StatisticsService';
import { BaseComponent } from '../core/base/base.component';
import { DashboardStatistics } from '../core/services/StatisticsService/models';
import { ConfigurationService } from '../core/services/ConfigurationService/ConfigurationService';
import { ConfigurationModel } from '../core/services/ConfigurationService/models';
import { StorageService } from '../core/services/StorageService/StorageService';
import { StorageKeys } from '../core/services/StorageService/StorageKeys';
import { Subscription } from 'rxjs/Subscription';
import { SharedService } from '../core/services/SharedService/SharedService';
import { SharedEventName } from '../core/services/SharedService/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent extends BaseComponent implements OnInit, OnDestroy {

  statistics: DashboardStatistics = <DashboardStatistics>{};

  constructor(private statisticsService: StatisticsService, private sharedService: SharedService) {
    super();
    this.sharedSubscription = this.sharedService.currentMessage.subscribe(r => {
      switch (r.name) {
    
          case SharedEventName.ShopChanged:
              this.getStats()
              break
      }
      })
  }

  ngOnInit() {
    this.getStats()
  }

  getStats(){
    this.showLoader();
    this.statisticsService.get().subscribe(stats => {
      this.statistics = stats;
      this.hideLoader();
    });
  }
  ngOnDestroy() {
    this.sharedSubscription.unsubscribe();
  }

  isAdmin() {
    return StorageService.getItem(StorageKeys.role).toLowerCase() === 'admin';
  }
}
