import { Component, Output } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public authService: AuthService,
    private db: AngularFireDatabase) {
    const observable = this.db.object(`connected`);

    observable
      .take(2)
      .subscribe(
        next => console.log('next', next),
        error => console.log('error', error),
        () => console.log('completed')
      );
  }
}

