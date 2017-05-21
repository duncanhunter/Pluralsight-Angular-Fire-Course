import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactEditComponent } from './contact/contact-edit/contact-edit.component';

const routes: Routes = [
{ path: '', pathMatch: 'full', redirectTo: 'company-list' },
{ path: 'company-list', component: CompanyListComponent },
{ path: 'company-edit/:id', component: CompanyEditComponent },
{ path: 'contact-list', component: ContactListComponent },
{ path: 'contact-edit/:id', component: ContactEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
