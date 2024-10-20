import { TestBed, inject } from "@angular/core/testing";

import { ExcelExporterService } from "./excel-exporter.service";

describe("ExcelExporterService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExcelExporterService]
    });
  });

  it("should be created", inject([ExcelExporterService], (service: ExcelExporterService) => {
    expect(service).toBeTruthy();
  }));
});
