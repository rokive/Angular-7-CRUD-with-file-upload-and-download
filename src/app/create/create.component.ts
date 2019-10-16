import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TradeDetailsService } from '../shared/services/trade-details.service';
import { Trade } from '../shared/models/trade.interface';
import { Level } from '../shared/models/level.interface';
import { Language } from '../shared/models/language.interface';
import { TradeDetails } from '../shared/models/trade-details.interface';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { Alert } from '../shared/models/alert.interface';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
  alerts: Alert[]=[];
  @ViewChild('tradeDetails') tradeDetails: NgForm ;
  minDate: any;
  startDate: any;
  date: any;
  tradeList: Trade[]
  levelList: Level[] = [];
  languageList: Language[];
  tradeId:number;
  level: number;
  selectedLanguage: Array<any> = [];
  fileSyllabus: File = null;
  fileSyllabusPlan: File = null;
  isRequesting: boolean;
  syllabusFileName:string;
  fileSyllabusPlanName:string
  private readonly onDestroy = new Subject<void>();
  constructor(private tradeDetailsService: TradeDetailsService, private ngbDateParserFormatter: NgbDateParserFormatter,private router: Router) { }

  ngOnInit() {
    this.minDate = { year: 2019, month: 1, day: 1 };
    var date=new Date();
    this.startDate = { year: date.getFullYear(), month:date.getMonth()+1, day: date.getDate() };
    this.tradeDetailsService.getAllTrade().subscribe((result: Array<Trade>) => {
      this.tradeList = result;
      this.levelList = this.tradeList[0].level
      console.log(this.tradeList);
    }, error => {
      console.log(error);
    });
    this.tradeDetailsService.getAllLanguage().subscribe((result: Language[]) => {
      this.languageList = result;
      console.log(this.languageList);
    }, error => {
      console.log(error)
    });
  }
  create({ value, valid }: { value: TradeDetails, valid: boolean }) {
    this.isRequesting = true;
    value.language = this.selectedLanguage.join(',')
    value.syllabusFile = this.syllabusFileName
    value.planFile =this.fileSyllabusPlanName
    if (valid) {
      console.log(value);
      value.activeDate = new Date(this.ngbDateParserFormatter.format(value.date));
      this.tradeDetailsService.addTradeDetails(value).subscribe(result => {
        this.reset();
        this.alerts.push({
          type: 'success',
          message: 'Save Successfully',
        });
      }, error => {
        this.alerts.push({
          type: 'danger',
          message: 'Some thing is wrong',
        });
      })
    }
    this.isRequesting = false;
  }

  onChangeTrade(value) {
    this.levelList = this.tradeList.find(t => t.id === value).level;
    this.level =  this.levelList[0].id;

  }
  onChangelanguage(language: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedLanguage.push(language);
    } else {
      let index = this.selectedLanguage.indexOf(language);
      this.selectedLanguage.splice(index, 1);
    }
    console.log(this.selectedLanguage);
  }
  handlefileSyllabus(files: FileList) {
    this.fileSyllabus = files.item(0);
    this.tradeDetailsService.fileUpload(this.fileSyllabus).subscribe((result: any) => {
      this.syllabusFileName = result.renameFile
      console.log(result.renameFile);
    });
  }
  handlefileSyllabusPlan(files: FileList) {
    this.fileSyllabusPlan = files.item(0);
    this.tradeDetailsService.fileUpload(this.fileSyllabusPlan).subscribe((result: any) => {
      this.fileSyllabusPlanName = result.renameFile
      console.log(result.renameFile)
    });
  }
  reset(){
    this.tradeDetails.reset();
  }
  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  
}
