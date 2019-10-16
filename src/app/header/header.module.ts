import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import {  NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';
@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    NavbarModule, WavesModule, ButtonsModule,

  ],
  exports:[
    HeaderComponent
  ]
})
export class HeaderModule { }
