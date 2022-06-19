import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ApiResponse } from '@nera/core'
import { Product, ProductId, ProductService } from '@nera/products'
import {
  ConfirmationDialogueService,
  ToastMessageService,
  ToastMessageSeverity,
  ToastMessageSummary
} from '@nera/ui'

@Component({
  selector: 'admin-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private messageService: ToastMessageService,
    private confirmationService: ConfirmationDialogueService,
    private router: Router
  ) {}

  title = 'Products'
  subtitle = 'List of all products'
  products: Product[] = []

  navigateToEditPage(id: ProductId) {
    this.router.navigate(['products/edit/', id])
  }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(response => {
      this.products = response.products
    })
  }

  confirmation(id: ProductId): () => void {
    return () => {
      this.productService.deleteProduct(id).subscribe({
        next: ({ message }: ApiResponse<Product>) => {
          this.products = this.products.filter(product => product.id !== id)

          message &&
            this.messageService.handleToastMessage(
              ToastMessageSeverity.Success,
              ToastMessageSummary.Success,
              message
            )
        },
        error: ({ error }: { error: ApiResponse<Product> }) => {
          error?.message &&
            this.messageService.handleToastMessage(
              ToastMessageSeverity.Error,
              ToastMessageSummary.Error,
              error.message
            )
        }
      })
    }
  }

  deleteProduct(id: ProductId): void {
    this.confirmationService.handleConfirm(this.confirmation(id))
  }
}
