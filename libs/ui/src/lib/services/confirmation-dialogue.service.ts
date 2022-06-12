import { Injectable } from '@angular/core'
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api'
import { ToastMessageSeverity, ToastMessageSummary } from './toast-message.service'

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogueService {
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  handleConfirm(handler: () => void) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: ToastMessageSeverity.Info,
          summary: ToastMessageSummary.Confirm,
          detail: 'You have accepted'
        })
        handler()
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: ToastMessageSeverity.Error,
              summary: ToastMessageSummary.Reject,
              detail: 'You have rejected'
            })
            break
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: ToastMessageSeverity.Warn,
              summary: ToastMessageSummary.Cancel,
              detail: 'You have cancelled'
            })
            break
        }
      }
    })
  }

  handleDelete(handler: () => void) {
    this.confirmationService.confirm({
      message: `Do you want to delete this record?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.messageService.add({
          severity: ToastMessageSeverity.Info,
          summary: ToastMessageSummary.Confirm,
          detail: `Record deleted`
        })
        handler()
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: ToastMessageSeverity.Error,
              summary: ToastMessageSummary.Reject,
              detail: 'You have rejected'
            })
            break
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: ToastMessageSeverity.Warn,
              summary: ToastMessageSummary.Cancel,
              detail: 'You have cancelled'
            })
            break
        }
      }
    })
  }
}
