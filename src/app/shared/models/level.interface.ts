import { Trade } from './trade.interface';
import { TradeDetails } from './trade-details.interface';

export interface Level{
    id:number,
    levelName:string,
    tradeId:number,
    trade:Trade
}
