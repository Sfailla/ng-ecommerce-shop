import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ApiError, ApiResponse } from '@nera/core'
import { Category, CategoryId, CategoryService } from '@nera/category'
import {
  ConfirmationDialogueService,
  ToastMessageService,
  ToastMessageSeverity,
  ToastMessageSummary
} from '@nera/ui'

@Component({
  selector: 'admin-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private messageService: ToastMessageService,
    private confirmationService: ConfirmationDialogueService,
    private router: Router
  ) {
    this.categoryService = categoryService
    this.messageService = messageService
    this.confirmationService = confirmationService
    this.router = router
  }

  categories: Category[] = []

  title = 'Categories'
  subtitle = 'List of all categories'

  navigateToEditPage(id: CategoryId) {
    this.router.navigate(['/categories/edit/', id])
  }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe((categorySubscription) => {
      const categories = categorySubscription.categories
      this.categories = categories
    })
  }

  deleteCategory(id: CategoryId): void {
    this.confirmationService.handleConfirm(() =>
      this.categoryService.deleteCategory(id).subscribe({
        next: ({ message }: ApiResponse<Category>) => {
          this.getCategories()
          if (message) {
            this.messageService.handleToastMessage(
              ToastMessageSeverity.Success,
              ToastMessageSummary.Success,
              message
            )
          }
        },
        error: ({ error }: { error: ApiError }) => {
          this.messageService.handleToastMessage(
            ToastMessageSeverity.Error,
            ToastMessageSummary.Error,
            error.message
          )
        }
      })
    )
  }
}
