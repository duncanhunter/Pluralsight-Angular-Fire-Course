import './core/rxjs-extensions';
import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment.prod';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { CompanyService } from './company/company.service';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MdButtonModule,
  MdCardModule,
  MdInputModule,
  MdToolbarModule,
  MdProgressBarModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    CompanyEditComponent,
    CompanyListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdToolbarModule,
    MdProgressBarModule
  ],
  providers: [CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
