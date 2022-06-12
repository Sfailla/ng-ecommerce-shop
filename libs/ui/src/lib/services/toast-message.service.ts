import { Injectable } from '@angular/core'
import { MessageService } from 'primeng/api'

export enum ToastMessageSummary {
  Success = 'Success',
  Error = 'Error',
  Warn = 'Warn',
  Info = 'Info',
  Cancel = 'Cancelled',
  Reject = 'Rejected',
  Confirm = 'Confirmed'
}

export enum ToastMessageSeverity {
  Success = 'success',
  Error = 'error',
  Warn = 'warn',
  Info = 'info'
}

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {
  constructor(private messageService: MessageService) {}

  handleToastMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail })
  }
}
