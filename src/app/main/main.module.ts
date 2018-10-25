import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { ContributorsListComponent } from './contributors-list/contributors-list.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';
import { ContributorPageComponent } from './contributor-page/contributor-page.component';

@NgModule({
  declarations: [
    LoginComponent,
    ContributorsListComponent,
    ContributorPageComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    ComponentsModule,
    SharedModule
  ],
  exports: [
    LoginComponent,
    ContributorsListComponent
  ]
})
export class MainModule { }
