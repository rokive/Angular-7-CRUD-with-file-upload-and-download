import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    CreateComponent,
  ],
  imports: [
    CommonModule,
    CreateRoutingModule,
    FormsModule,
    NgbModule,
    NgSelectModule
  ]
})
export class CreateModule { }
