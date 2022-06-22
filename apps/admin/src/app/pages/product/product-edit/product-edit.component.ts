import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Category, CategoryService } from '@nera/category'
import { HelperFns } from '@nera/core'
import { ProductService, Product, ProductId } from 'libs/product/src'

@Component({
  selector: 'admin-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  // COMPONENT STATE
  categories$: Category[] = []
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
    private route: ActivatedRoute,
    private utils: HelperFns
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: [''],
      rating: [''],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: ['']
    })
  }

  ngOnInit() {
    this.setInitialFormValues()
    this.getCategories()
  }

  setInitialFormValues() {
    this.productId = this.route.snapshot.paramMap.get('id') as ProductId

    this.productService.getProductById(this.productId).subscribe(response => {
      const product = response.product

      for (const key in this.form.controls) {
        const productValue = key === 'category' ? product.category.id : product[key]
        this.setFormValue(key, productValue)
      }
      this.imageDisplay = product.image
    })
  }

  setFormValue(formValue: string, value: unknown) {
    this.form.controls[formValue].setValue(value)
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(response => {
      const categories = response.categories
      this.categories$ = categories
    })
  }

  onToggleChange(event: HTMLInputElement) {
    this.setFormValue('isFeatured', event.checked)
  }

  onRateChange(event: HTMLInputElement) {
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

  updateProduct(product: Product): void {
    this.productService.updateProduct(this.productId, product).subscribe({
      next: this.utils.handleSuccess({ redirectTo: '/products' }),
      error: this.utils.handleError()
    })
  }

  onSubmit(event: MouseEvent) {
    event.preventDefault()
    this.isSubmitted = true

    if (this.form.invalid) return

    const formValues = this.form.controls
    const formData = new FormData()
    Object.keys(formValues).map(key => formData.append(key, formValues[key].value))
    const updatedProduct = formData as unknown as Product
    this.updateProduct(updatedProduct)
  }
}
