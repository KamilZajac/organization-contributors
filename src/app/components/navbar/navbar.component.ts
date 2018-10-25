import { Component, Input, Output, EventEmitter } from '@angular/core';

const sortingOptions = [
  'contributions', 'gists', 'followers'
]

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() organization: string;
  @Output() sortingChanged: EventEmitter<{ property: string, direction: string }> = new EventEmitter();
  @Output() changeOrganizationClicked = new EventEmitter();
  sortingOptions = sortingOptions;

  activeSorting = { property: 'contributions', direction: 'desc' };

  constructor() { }

  sortBy(option) {
    if (this.activeSorting.property === option) {
      this.activeSorting.direction = this.activeSorting.direction === 'desc' ? 'asc' : 'desc';
    } else {
      this.activeSorting.property = option;
      this.activeSorting.direction = 'desc';
    }
    this.sortingChanged.emit(this.activeSorting);
  }
  onChangeOrganization() {
    this.changeOrganizationClicked.emit(null);
  }
}
