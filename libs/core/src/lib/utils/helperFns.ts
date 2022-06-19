import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { ToastMessageService, ToastMessageSeverity, ToastMessageSummary } from '@nera/ui'
import { ApiResponse, ApiError } from '../types'

interface SuccessConfig {
  redirectTo?: string | null
  setState?: (() => void) | void | null
}

type SuccessResponse<T> = (response: ApiResponse<T>) => void

@Injectable()
export class HelperFns {
  constructor(private messageService: ToastMessageService, private router: Router) {}

  handleSuccess<T>({ redirectTo = null, setState }: SuccessConfig = {}): SuccessResponse<T> {
    return (response: ApiResponse<T>) => {
      if (response.message) {
        this.messageService.handleToastMessage(
          ToastMessageSeverity.Success,
          ToastMessageSummary.Success,
          response.message
        )
      } else if (setState) {
        setState()
      } else if (redirectTo) {
        setTimeout(() => this.router.navigateByUrl(redirectTo), 1500)
      }
    }
  }

  handleError = () => {
    return (error: ApiError) => {
      this.messageService.handleToastMessage(
        ToastMessageSeverity.Error,
        ToastMessageSummary.Error,
        error.message
      )
    }
  }
}
