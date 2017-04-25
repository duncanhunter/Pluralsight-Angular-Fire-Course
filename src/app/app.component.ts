import { Component, Output } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  constructor(private db: AngularFireDatabase){
    this.db.object(`connected`)
      .subscribe(console.log);
  }
}

