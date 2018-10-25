import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './main/login/login.component';
import { ContributorsListComponent } from './main/contributors-list/contributors-list.component';
import { ContributorPageComponent } from './main/contributor-page/contributor-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'contributors',
    component: ContributorsListComponent
  },
  {
    path: 'contributors/:login',
    component: ContributorPageComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  declarations: [],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule {
}
