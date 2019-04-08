import { TestBed, inject } from '@angular/core/testing';

import { MapDocumentsService } from './map-documents.service';

describe('MapDocumentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapDocumentsService]
    });
  });

  it('should be created', inject([MapDocumentsService], (service: MapDocumentsService) => {
    expect(service).toBeTruthy();
  }));
});
