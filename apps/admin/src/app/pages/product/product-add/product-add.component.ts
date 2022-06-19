import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Category, CategoryService } from '@nera/category'
import { HelperFns } from '@nera/core'
import { Product, ProductService } from '@nera/products'

@Component({
  selector: 'admin-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  // COMPONENT STATE
  categories: Category[] = []
  imageDisplay!: ArrayBuffer | string | null
  selectedFile!: File
  form: FormGroup
  isSubmitted = false
  title = 'Add Product'
  subtitle = 'You can add a product here!'

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private utils: HelperFns
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

  createProduct(product: Product): void {
    this.productService.createProduct(product).subscribe({
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

    this.createProduct(formData as unknown as Product)
  }
}
