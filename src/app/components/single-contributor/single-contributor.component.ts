import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-contributor',
  templateUrl: './single-contributor.component.html',
  styleUrls: ['./single-contributor.component.scss']
})
export class SingleContributorComponent {
  @Input() contributor;

  constructor() { }
}
