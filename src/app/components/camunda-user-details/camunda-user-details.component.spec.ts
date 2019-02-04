import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamundaUserDetailsComponent } from './camunda-user-details.component';

describe('CamundaUserDetailsComponent', () => {
  let component: CamundaUserDetailsComponent;
  let fixture: ComponentFixture<CamundaUserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamundaUserDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamundaUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
