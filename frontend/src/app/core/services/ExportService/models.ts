export interface ExportProductRequest {
    shopId: number;
    lastUpdateDateFrom: Date;
    idFrom: number;
    idTo: number;
    onlyAvailable: boolean;
    onlyReady: boolean;
    onlyForExport: boolean;
}