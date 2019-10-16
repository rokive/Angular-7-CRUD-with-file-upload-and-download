import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpHeaders, HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { ConfigService } from '../utils/config.service';
import { Trade } from '../models/trade.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Language } from '../models/language.interface';
import { TradeDetails } from '../models/trade-details.interface';
import { TradeDetailsViewModel } from '../models/trade-details-view-model.interface';
import { Level } from '../models/level.interface';

@Injectable({
  providedIn: 'root'
})
export class TradeDetailsService extends BaseService {
  baseUrl: string;
  // Observable navItem source
  private _update = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  update$ = this._update.asObservable();
  
  constructor(private httpclint: HttpClient, private configService: ConfigService) {
    super();
    this.baseUrl = configService.getApiURI();
  }
  getAllTrade(): Observable<Trade[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.httpclint.get<Trade[]>(this.baseUrl + "/GetAllTrade", httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  getAllLevelByTradeId(id:number): Observable<Level[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.httpclint.get<Level[]>(this.baseUrl + "/GetAllLevelByTradeId/"+id, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  getAllLanguage(): Observable<Language[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.httpclint.get<Language[]>(this.baseUrl + "/GetAllLanguage", httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  addTradeDetails(tradeDetails: TradeDetails): Observable<TradeDetails> {
   // let body=JSON.stringify(tradeDetails);
    let body = JSON.stringify({
      tradeId: tradeDetails.tradeId, levelId: tradeDetails.levelId, language: tradeDetails.language,
      syllabusName: tradeDetails.syllabusName, syllabusFile: tradeDetails.syllabusFile, planFile: tradeDetails.planFile,
      developmentOfficer: tradeDetails.developmentOfficer, manager: tradeDetails.manager, activeDate: tradeDetails.activeDate
    })
    console.log(body)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.httpclint.post<TradeDetails>(this.baseUrl + '/AddTradeDetails', body, httpOptions).pipe(

      catchError(this.handleError)
    );
  }

  getAllTradeDetails(pageNo: number, pagesize: number, tradeId: number = 0, levelId: number = 0): Observable<TradeDetailsViewModel> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.httpclint.get<TradeDetailsViewModel>(this.baseUrl + "/GetTradeDetailsList/" + pageNo + "/" + pagesize + "/" + tradeId + "/" + levelId, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  fileUpload(syllabusFile: File, ): Observable<string> {
    const body: FormData = new FormData();
    body.append('File', syllabusFile, syllabusFile.name);
    const httpOptions = {
      headers: new HttpHeaders({
       
      })
    };
    return this.httpclint.post<string>(this.baseUrl + '/FileUpload', body, httpOptions).pipe(

      catchError(this.handleError)
    );
  }
  getDownloadFile(fileName: string): Observable<HttpEvent<Blob>> {
    return this.httpclint.request(new HttpRequest(
      'GET',
      this.baseUrl+'/GetFileDownload/'+fileName,
      null,
      {
        reportProgress: true,
        responseType: 'blob'
      }));
  }
  getTradeDetailsById(id:number):Observable<TradeDetails>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.httpclint.get<TradeDetails>(this.baseUrl + "/GetTradeDetailsById/" + id , httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  updateTradeDetails(tradeDetails: TradeDetails): Observable<TradeDetails> {
    //let body=JSON.stringify(tradeDetails);
    let body = JSON.stringify({
      tradeId: tradeDetails.tradeId, levelId: tradeDetails.levelId, language: tradeDetails.language,
      syllabusName: tradeDetails.syllabusName, syllabusFile: tradeDetails.syllabusFile, planFile: tradeDetails.planFile,
      developmentOfficer: tradeDetails.developmentOfficer, manager: tradeDetails.manager, activeDate: tradeDetails.activeDate
    });
    console.log(body)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.httpclint.put<TradeDetails>(this.baseUrl + '/UpdateTradeDetails/'+tradeDetails.id, body, httpOptions).pipe(
      
      catchError(this.handleError)
    );
  }
  updateList(){
    this._update.next(true);
   
    
  }
  updateComplete(){
    this._update.next(false);
  }
}
