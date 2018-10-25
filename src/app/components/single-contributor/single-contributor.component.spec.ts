import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleContributorComponent } from './single-contributor.component';

describe('SingleContributorComponent', () => {
  let component: SingleContributorComponent;
  let fixture: ComponentFixture<SingleContributorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleContributorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleContributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
