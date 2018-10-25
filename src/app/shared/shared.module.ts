import { NgModule } from '@angular/core';
import { sortByPipe } from './pipes/sortBy.pipe';

@NgModule({
  declarations: [
    sortByPipe
  ],
  exports: [
    sortByPipe
  ]
})
export class SharedModule { }
