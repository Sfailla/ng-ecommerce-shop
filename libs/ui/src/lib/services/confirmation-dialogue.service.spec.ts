import { TestBed } from '@angular/core/testing';

import { ConfirmationDialogueService } from './confirmation-dialogue.service';

describe('ConfirmationDialogueService', () => {
  let service: ConfirmationDialogueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmationDialogueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
