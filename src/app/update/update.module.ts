import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateComponent } from './update.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [UpdateComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    NgSelectModule
  ],
  exports:[
    UpdateComponent
  ]
})
export class UpdateModule { }
