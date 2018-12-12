import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePermissionsPickerComponent } from './role-permissions-picker.component';

describe('RolePermissionsPickerComponent', () => {
  let component: RolePermissionsPickerComponent;
  let fixture: ComponentFixture<RolePermissionsPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolePermissionsPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolePermissionsPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
