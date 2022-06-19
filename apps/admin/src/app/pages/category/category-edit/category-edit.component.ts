import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HelperFns } from '@nera/core'
import { Category, CategoryId, CategoryService } from '@nera/category'

@Component({
  selector: 'admin-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: ActivatedRoute,
    private utils: HelperFns
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
      next: this.utils.handleSuccess(),
      error: this.utils.handleError()
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
