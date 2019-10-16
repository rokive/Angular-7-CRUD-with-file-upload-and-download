import { Level } from './level.interface';
import { Language } from './language.interface';
import { Trade } from './trade.interface';

export interface TradeDetails {
    id:number,
    tradeId:number,
    levelId:number,
    language:String,
    syllabusName:String,
    syllabusFile:string,
    planFile:string,
    developmentOfficer:string,
    manager:string
    activeDate:Date,
    date:any
    level:Level,
    languageList:Language[],
    levelList:Level[],
    tradeList:Trade[],
}
