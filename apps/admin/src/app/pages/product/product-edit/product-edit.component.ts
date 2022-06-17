import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Category, CategoryService } from '@nera/category'
import { ApiResponse, ApiError } from '@nera/core'
import { ProductService, Product, ProductId } from '@nera/products'
import { ToastMessageService, ToastMessageSeverity, ToastMessageSummary } from '@nera/ui'

@Component({
  selector: 'admin-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  // COMPONENT STATE
  categories: Category[] = []
  productId: ProductId
  imageDisplay!: ArrayBuffer | string | null
  selectedFile!: File
  form: FormGroup
  isSubmitted = false
  title = 'Edit Product'
  subtitle = 'You can edit a product here!'

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private messageService: ToastMessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      rating: [''],
      richDescription: [''],
      image: [''],
      isFeatured: ['']
    })
  }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id') as ProductId

    this.productService.getProductById(this.productId).subscribe(response => {
      const product = response.product

      for (const key in this.form.controls) {
        if (this.form.controls[key]) {
          this.form.controls[key].setValue(product[key])
        }
      }
    })

    this.getCategories()
  }

  setFormValue(formValue: keyof Product, value: unknown) {
    this.form.controls[formValue].setValue(value)
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(response => {
      const categories = response.categories
      this.categories = categories
    })
  }

  onToggleChange(event: HTMLInputElement) {
    this.setFormValue('isFeatured', event.checked)
  }

  onRateChange(event: HTMLInputElement) {
    console.log(event.value)
    this.setFormValue('rating', event.value)
  }

  onFileChange(event: Event) {
    const file = (event as Event & { currentFiles: File }).currentFiles[0]

    this.selectedFile = file
    this.setFormValue('image', file)

    const fileReader = new FileReader()
    fileReader.onload = () => {
      this.imageDisplay = fileReader.result
    }
    fileReader.readAsDataURL(file as unknown as Blob)
  }

  handleSuccess<T>(response: ApiResponse<T>) {
    response.message &&
      this.messageService.handleToastMessage(
        ToastMessageSeverity.Success,
        ToastMessageSummary.Success,
        response.message
      )

    setTimeout(() => this.router.navigateByUrl('/products'), 1500)
  }

  updateProduct(product: Product): void {
    this.productService.updateProduct(this.productId, product).subscribe({
      next: response => this.handleSuccess<Product>(response),
      error: (error: ApiError) => {
        if (error) {
          console.log('error block hit')

          this.messageService.handleToastMessage(
            ToastMessageSeverity.Error,
            ToastMessageSummary.Error,
            error.message
          )
        }
      }
    })
  }

  onSubmit(event: MouseEvent) {
    event.preventDefault()
    this.isSubmitted = true

    if (this.form.invalid) return

    const formValues = this.form.controls
    const formData = new FormData()

    Object.keys(formValues).map(key => formData.append(key, formValues[key].value))

    this.updateProduct(formData as unknown as Product)
  }
}
