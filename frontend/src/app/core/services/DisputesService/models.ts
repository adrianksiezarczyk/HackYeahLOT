export interface GetDisputeModel {}

export interface DisputeModel {}

export enum DisputeStatusId {
    Pending = 1,
    Approved = 2,
    FullyRejected = 3,
    PartiallyRejected = 4,
    InProgress = 5
}