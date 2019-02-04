import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamundaUserListComponent } from './camunda-user-list.component';

describe('CamundaUserListComponent', () => {
  let component: CamundaUserListComponent;
  let fixture: ComponentFixture<CamundaUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamundaUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamundaUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
