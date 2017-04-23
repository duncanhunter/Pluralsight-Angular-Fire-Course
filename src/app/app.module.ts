import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';

const firebaseConfig = {
  apiKey: 'AIzaSyBJsTnYKiu2mdLnwkSidQjw3THCty5sEm4',
  authDomain: 'buildingappswithangularf-ebcb5.firebaseapp.com',
  databaseURL: 'https://buildingappswithangularf-ebcb5.firebaseio.com',
  projectId: 'buildingappswithangularf-ebcb5',
  storageBucket: 'buildingappswithangularf-ebcb5.appspot.com',
  messagingSenderId: '957445559070'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
