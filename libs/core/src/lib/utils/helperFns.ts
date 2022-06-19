import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { ToastMessageService, ToastMessageSeverity, ToastMessageSummary } from '@nera/ui'
import { ApiResponse, ApiError } from '../types'

interface SuccessConfig {
  redirectTo?: string | null
  setState?: (() => void) | void | null
  message?: string
}

type SuccessResponse<T> = (response: ApiResponse<T>) => void

@Injectable()
export class HelperFns {
  constructor(private messageService: ToastMessageService, private router: Router) {}

  private toastMessage(message: string) {
    return this.messageService.handleToastMessage(
      ToastMessageSeverity.Success,
      ToastMessageSummary.Success,
      message
    )
  }

  private buildResponse({ message, setState, redirectTo }: SuccessConfig): void {
    if (message) this.toastMessage(message)
    else if (setState) setState()
    else if (redirectTo) setTimeout(() => this.router.navigateByUrl(redirectTo), 1500)
  }

  public handleSuccess =
    <T>({ redirectTo = null, setState }: SuccessConfig = {}): SuccessResponse<T> =>
    ({ message }: ApiResponse<T>) => {
      this.buildResponse({ message, setState, redirectTo })
    }

  public handleError = () => (error: ApiError) => {
    this.messageService.handleToastMessage(
      ToastMessageSeverity.Error,
      ToastMessageSummary.Error,
      error.message
    )
  }
}
