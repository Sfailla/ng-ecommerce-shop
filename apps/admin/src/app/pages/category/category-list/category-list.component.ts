import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Category, CategoryId, CategoryService } from '@nera/category'
import { HelperFns } from '@nera/core'
import { ConfirmationDialogueService } from '@nera/ui'

@Component({
  selector: 'admin-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private confirmationService: ConfirmationDialogueService,
    private router: Router,
    private utils: HelperFns
  ) {}

  categories$: Category[] = []

  title = 'Categories'
  subtitle = 'List of all categories'

  navigateToEditPage(id: CategoryId) {
    this.router.navigate(['/categories/edit/', id])
  }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categorySubscription => {
      const categories = categorySubscription.categories
      this.categories$ = categories
    })
  }

  updateCategoryState(id: CategoryId) {
    this.categories$ = this.categories$.filter(category => category.id !== id)
  }

  confirmation(id: CategoryId): () => void {
    return () => {
      this.categoryService.deleteCategory(id).subscribe({
        next: this.utils.handleSuccess({ setState: this.updateCategoryState(id) }),
        error: this.utils.handleError()
      })
    }
  }

  deleteCategory(id: CategoryId): void {
    this.confirmationService.handleConfirm(this.confirmation(id))
  }
}
