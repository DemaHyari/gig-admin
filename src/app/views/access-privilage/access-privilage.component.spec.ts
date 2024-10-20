import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessPrivilageComponent } from './access-privilage.component';

describe('AccessPrivilageComponent', () => {
  let component: AccessPrivilageComponent;
  let fixture: ComponentFixture<AccessPrivilageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessPrivilageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessPrivilageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
