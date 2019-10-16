import { Component, OnInit, OnDestroy } from '@angular/core';
import { TradeDetailsService } from '../shared/services/trade-details.service';
import { TradeDetailsViewModel } from '../shared/models/trade-details-view-model.interface';
import { TradeDetails } from '../shared/models/trade-details.interface';
import { PagerService } from '../shared/services/pager.service';
import {Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Trade } from '../shared/models/trade.interface';
import { Level } from '../shared/models/level.interface';
import { HttpEventType } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateComponent } from '../update/update.component';
import { Alert } from '../shared/models/alert.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
 
  tradeList: Trade[];
  levelList: Level[];
  ngOnDestroy(): void {
    this.onDestroy.next();
  }
  private readonly onDestroy = new Subject<void>();
  pageNo: number = 1;
  pageSize: number = 10
  totalPage: number;
  tradeDetailsList: TradeDetails[] = [];
  baseUrl: string = "";
  pager: any = {};
  totalItem: number;
  tradeId: number = 0;
  levelId: number = 0;
  isUpdate:boolean=false;
  constructor(private tradeDetailsService: TradeDetailsService, private pagerService: PagerService, public modalService: NgbModal) {
    this.tradeDetailsService.update$.subscribe(result=>{
      if(this.isUpdate)
      {
        this.getCurrentList(this.pageNo, this.pageSize);
        this.isUpdate=false;
      }
    })
   }

  ngOnInit() {
    this.getCurrentList(this.pageNo, this.pageSize);
    
  }
  getCurrentList(pageNo: number, pageSize: number) {
    console.log(pageNo, pageSize)
    this.tradeDetailsService.getAllTradeDetails(pageNo - 1, pageSize).pipe(takeUntil(this.onDestroy)).subscribe((result: TradeDetailsViewModel) => {
      this.tradeDetailsList = result.tradeDetailsList;
      this.totalPage = result.totalPageNo;
      this.totalItem = result.totalItem;
      this.pager = this.pagerService.getPager(this.totalItem, pageNo, this.pageSize);
      console.log(this.tradeDetailsList);

    });
    this.tradeDetailsService.getAllTrade().pipe(takeUntil(this.onDestroy)).subscribe((result: Array<Trade>) => {
      this.tradeList = result;
      this.levelList = this.tradeList[0].level
      console.log(this.tradeList);
    }, error => {
      console.log(error);
    });
  }
  onChangeTrade(value) {
    this.levelId = 0;
    this.levelList = this.tradeList.find(t => t.id === value).level;

  }
  setPage(pageNo: number) {

    this.tradeDetailsService.getAllTradeDetails(pageNo - 1, this.pageSize, this.tradeId, this.levelId).pipe(takeUntil(this.onDestroy)).subscribe((result: TradeDetailsViewModel) => {
      this.tradeDetailsList = result.tradeDetailsList;
      this.totalPage = result.totalPageNo;
      this.totalItem = result.totalItem;
      this.pager = this.pagerService.getPager(this.totalItem, pageNo, this.pageSize);
      console.log(result);

    });
  }
  onChangePageSize() {
    this.pageNo = 1;
    this.tradeDetailsService.getAllTradeDetails(this.pageNo - 1, this.pageSize).pipe(takeUntil(this.onDestroy)).subscribe((result: TradeDetailsViewModel) => {
      this.tradeDetailsList = result.tradeDetailsList;
      this.totalPage = result.totalPageNo;
      this.totalItem = result.totalItem;
      this.pager = this.pagerService.getPager(this.totalItem, this.pageNo, this.pageSize);
      console.log(this.tradeDetailsList);

    });
  }
  search() {
    this.setPage(1);
  }
  download(fileName) {
    this.tradeDetailsService.getDownloadFile(fileName).subscribe(
      data => {
        switch (data.type) {

          case HttpEventType.Response:

            const downloadedFile = new Blob([data.body], { type: data.body.type });
            const a = document.createElement('a');
            a.setAttribute('style', 'display:none;');
            document.body.appendChild(a);
            a.download = fileName;
            a.href = URL.createObjectURL(downloadedFile);
            a.target = '_blank';
            a.click();
            document.body.removeChild(a);
        }
      },
      error => {

      }
    );
  };

  
  openModal(id) {
    const modalRef = this.modalService.open(UpdateComponent);
    modalRef.componentInstance.id =id;
    this.isUpdate=true;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });
   
  }
}

