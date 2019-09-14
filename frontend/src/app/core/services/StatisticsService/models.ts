export interface DashboardStatistics {
    totalProductsQuantity: number;
    totalCombinationsQuantity: number;
    ordersTodayQuantity: number;
    trackingCheckedToday: number;
    trackingOrdersQuantity: number;
    updatedTodayProductsQuantity: number;
    totalPackagesToday: number;
    totalProductsToUpdate: number;
    lastProductUpdateActivity: Date;
    lastTrackingActivity: Date;
    combinationPricesUpdates: number;
}