import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { HelperFns } from '@nera/core'
import { Product, ProductId, ProductService } from '@nera/products'
import { ConfirmationDialogueService } from '@nera/ui'

@Component({
  selector: 'admin-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  // COMPONENT STATE
  products$: Product[] = []
  paginatedProducts: Product[] = []
  title = 'Products'
  subtitle = 'List of all products'
  totalRecords = 0

  constructor(
    private productService: ProductService,
    private confirmationService: ConfirmationDialogueService,
    private router: Router,
    private utils: HelperFns
  ) {
    this.totalRecords = this.products$.length
  }

  navigateToEditPage(id: ProductId) {
    this.router.navigate(['products/edit/', id])
  }

  ngOnInit(): void {
    this.getProducts()
  }

  paginate(event: { pageIndex: number; pageSize: number }) {
    console.log(event)

    this.paginatedProducts = this.products$.slice(
      event.pageIndex * event.pageSize,
      (event.pageIndex + 1) * event.pageSize
    )

    // this.paginatedProducts = this.products$.slice(
    //   event.pageIndex * event.pageSize,
    //   event.pageIndex * event.pageSize + event.pageSize
    // )
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(response => {
      this.products$ = response.products
    })
  }

  updateProductState(id: ProductId) {
    this.products$ = this.products$.filter(product => product.id !== id)
  }

  confirmation(id: ProductId): () => void {
    return () => {
      this.productService.deleteProduct(id).subscribe({
        next: this.utils.handleSuccess({ setState: this.updateProductState(id) }),
        error: this.utils.handleError()
      })
    }
  }

  deleteProduct(id: ProductId): void {
    this.confirmationService.handleConfirm(this.confirmation(id))
  }
}
