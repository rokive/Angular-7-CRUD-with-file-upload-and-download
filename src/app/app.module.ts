import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {  routing } from './app-routing.module';
import { HttpModule, XHRBackend } from '@angular/http';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { ConfigService } from './shared/utils/config.service';
import { HttpClientModule } from '@angular/common/http';
import { UpdateComponent } from './update/update.component';
import { UpdateModule } from './update/update.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [UpdateComponent],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    HttpClientModule, 
    HeaderModule,
    UpdateModule

  ],
  providers: [
    ConfigService, { 
      provide: XHRBackend, 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
