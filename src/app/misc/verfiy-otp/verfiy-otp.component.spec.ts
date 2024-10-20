import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerfiyOTPComponent } from './verfiy-otp.component';

describe('VerfiyOTPComponent', () => {
  let component: VerfiyOTPComponent;
  let fixture: ComponentFixture<VerfiyOTPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerfiyOTPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerfiyOTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
