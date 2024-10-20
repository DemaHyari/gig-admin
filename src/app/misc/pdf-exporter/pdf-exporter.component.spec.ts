import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfExporterComponent } from './pdf-exporter.component';

describe('PdfExporterComponent', () => {
  let component: PdfExporterComponent;
  let fixture: ComponentFixture<PdfExporterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfExporterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfExporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
