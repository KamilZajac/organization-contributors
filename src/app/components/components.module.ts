import { NgModule, Component } from '@angular/core';
import { SingleContributorComponent } from './single-contributor/single-contributor.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SingleContributorComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SingleContributorComponent,
    NavbarComponent
  ]
})
export class ComponentsModule { }
