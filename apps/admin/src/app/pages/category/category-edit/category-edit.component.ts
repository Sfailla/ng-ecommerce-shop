import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ApiError, ApiResponse } from '@nera/core'
import { Category, CategoryId, CategoryService } from '@nera/category'
import { ToastMessageService, ToastMessageSeverity, ToastMessageSummary } from '@nera/ui'

@Component({
  selector: 'admin-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private messageService: ToastMessageService,
    private router: ActivatedRoute
  ) {
    this.form = formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['', Validators.required]
    })
  }

  categoryId: CategoryId = ''
  category = {} as Category
  form: FormGroup
  isSubmitted = false
  title = 'Edit Category'
  subtitle = 'You can edit a category here!'

  ngOnInit(): void {
    this.categoryId = this.router.snapshot.paramMap.get('id') as CategoryId

    this.categoryService.getCategoryById(this.categoryId).subscribe(response => {
      this.category = response.category

      for (const key in this.form.controls) {
        if (this.form.controls[key]) {
          this.form.controls[key].setValue(this.category[key])
        }
      }
    })
  }

  updateCategory(id: CategoryId, updates: Category) {
    this.categoryService.updateCategory(id, updates).subscribe({
      next: ({ message }: ApiResponse<Category>) => {
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
  }

  onSubmit(event: MouseEvent) {
    event.preventDefault()
    this.isSubmitted = true
    if (this.form.invalid) return

    const updatedCategory: Category = {
      name: this.form.value.name,
      icon: this.form.value.icon,
      color: this.form.value.color
    }

    this.updateCategory(this.categoryId, updatedCategory)
  }
}
