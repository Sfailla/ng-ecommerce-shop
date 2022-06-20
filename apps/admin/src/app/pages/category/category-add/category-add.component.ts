import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Category, CategoryService } from '@nera/category'
import { HelperFns } from '@nera/core'

@Component({
  selector: 'admin-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent {
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private utils: HelperFns
  ) {
    this.form = formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['', Validators.required]
    })
  }

  // COMPONENT STATE
  form: FormGroup
  isSubmitted = false
  title = 'Add Category'
  subtitle = 'You can add a category here!'

  createCategory(category: Category): void {
    this.categoryService.createCategory(category).subscribe({
      next: this.utils.handleSuccess({ redirectTo: '/categories' }),
      error: this.utils.handleError()
    })
  }

  onSubmit(event: MouseEvent): void {
    event.preventDefault()
    this.isSubmitted = true
    if (this.form.invalid) return

    const category = {
      name: this.form.controls.name.value,
      icon: this.form.controls.icon.value,
      color: this.form.controls.color.value
    }

    this.createCategory(category)
  }
}
