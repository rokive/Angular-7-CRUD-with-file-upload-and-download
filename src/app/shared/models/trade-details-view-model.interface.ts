import { TradeDetails } from './trade-details.interface';

export interface TradeDetailsViewModel {
    tradeDetailsList:TradeDetails[],
    totalPageNo:number,
    totalItem:number
}
