import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { TradeDetailsService } from '../shared/services/trade-details.service';
import { TradeDetails } from '../shared/models/trade-details.interface';
import { Trade } from '../shared/models/trade.interface';
import { Level } from '../shared/models/level.interface';
import { Language } from '../shared/models/language.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Alert } from '../shared/models/alert.interface';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  alerts: Alert[]=[];
  @ViewChild('tradeDetailsform') tradeDetailsform: NgForm;
  @Input() public id;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  minDate: any;
  startDate: any;
  tradeDetails: TradeDetails = null;
  trade: number;
  level: number;
  syllabusNameForDb: String = "";
  developmentOfficerName: string = "";
  managerName: string = "";
  tradeList: Trade[]
  levelList: Level[] = [];
  languageList: Language[];
  activeDate: any;
  private readonly onDestroy = new Subject<void>();
  selectedLanguage: Array<any> = [];
  fileSyllabus: File = null;
  fileSyllabusPlan: File = null;
  isRequesting: boolean;
  syllabusFileName:string;
  fileSyllabusPlanName:string;
 
  constructor(public activeModal: NgbActiveModal, private tradeDetailsService: TradeDetailsService, private ngbDateParserFormatter: NgbDateParserFormatter) { }


  ngOnInit() {
    this.minDate = { year: 2019, month: 1, day: 1 };
    var date = new Date();
    this.startDate = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    console.log(this.id);


    this.tradeDetailsService.getTradeDetailsById(this.id).subscribe((result: TradeDetails) => {
      this.tradeDetails = result;
      this.tradeList=result.tradeList;
      this.levelList=this.tradeDetails.levelList;
      this.languageList=result.languageList;
   
      this.trade = result.tradeId;
      this.level = result.levelId;
      this.syllabusNameForDb = result.syllabusName;
      this.developmentOfficerName = result.developmentOfficer;
      this.managerName = result.manager;
      let date = new Date(result.activeDate);
      this.activeDate = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
      console.log(this.activeDate);
      this.selectedLanguage = result.language.split(',');

      console.log(this.selectedLanguage);

    },
      error => {

      });
 
      
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

  passBack() {
    this.passEntry.emit(this.id);
    this.activeModal.close(this.id);
  }
  Update({ value, valid }: { value: TradeDetails, valid: boolean }) {
    this.isRequesting = true;
    value.language = this.selectedLanguage.join(',')
    console.log(value)
   
    value.syllabusFile = this.syllabusFileName
    value.planFile =this.fileSyllabusPlanName
    if (valid) {
      console.log(value);
      value.id = this.id;
      value.activeDate = new Date(this.ngbDateParserFormatter.format(value.date));
      console.log(value);
      this.tradeDetailsService.updateTradeDetails(value).subscribe(result => {
        this.tradeDetailsService.updateList();
        this.reset()
        this.passEntry.emit(this.id);
        this.activeModal.close(this.id);

      }, error => {
        this.alerts.push({
          type: 'danger',
          message: 'Some thing is wrong',
        });
      })
    }
    
    this.isRequesting = false;
  }
  reset() {
    this.tradeDetailsform.reset();
  }
  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

}
