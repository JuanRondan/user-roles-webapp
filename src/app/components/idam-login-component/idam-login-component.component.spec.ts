import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdamLoginComponent } from './idam-login-component.component';

describe('IdamLoginComponentComponent', () => {
  let component: IdamLoginComponent;
  let fixture: ComponentFixture<IdamLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdamLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdamLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
