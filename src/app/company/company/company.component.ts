import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  company$: FirebaseObjectObservable<any>;

  constructor(private db: AngularFireDatabase) {
    this.company$ = this.db.object(`company`);
  }

  ngOnInit() {
  }

}
