import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Category, CategoryService } from '@nera/category'
import { ApiError, ApiResponse } from '@nera/core'
import { ToastMessageService, ToastMessageSeverity, ToastMessageSummary } from '@nera/ui'

@Component({
  selector: 'admin-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent {
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private messageService: ToastMessageService,
    private router: Router
  ) {
    this.form = formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['', Validators.required]
    })

    this.categoryService = categoryService
    this.messageService = messageService
  }

  // COMPONENT STATE
  form: FormGroup
  isSubmitted = false
  title = 'Add Category'
  subtitle = 'You can add a category here!'

  createCategory(category: Category): void {
    this.categoryService.createCategory(category).subscribe({
      next: ({ message }: ApiResponse<Category>): void => {
        if (message) {
          this.messageService.handleToastMessage(
            ToastMessageSeverity.Success,
            ToastMessageSummary.Success,
            message
          )
          setTimeout(() => this.router.navigateByUrl('/categories'), 1500)
        }
      },
      error: ({ error }: { error: ApiError }): void => {
        this.messageService.handleToastMessage(
          ToastMessageSeverity.Error,
          ToastMessageSummary.Error,
          error.message
        )
      }
    })
  }

  onSubmit(event: MouseEvent): void {
    event.preventDefault()
    this.isSubmitted = true
    if (this.form.invalid) return

    const category = {
      name: this.form.controls['name'].value,
      icon: this.form.controls['icon'].value,
      color: this.form.controls['color'].value
    }

    this.createCategory(category)
  }
}
