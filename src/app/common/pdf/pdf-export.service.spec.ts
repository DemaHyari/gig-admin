import { TestBed, inject } from '@angular/core/testing';

import { PdfExportService } from './pdf-export.service';

describe('PdfExportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PdfExportService]
    });
  });

  it('should be created', inject([PdfExportService], (service: PdfExportService) => {
    expect(service).toBeTruthy();
  }));
});
