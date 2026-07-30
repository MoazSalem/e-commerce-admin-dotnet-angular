import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../core/services/product-service';

@Component({
  selector: 'app-add-product-component',
  imports: [ReactiveFormsModule],
  templateUrl: './add-product-component.html',
})
export class AddProductComponent {
  private productService = inject(ProductService);
  productForm: FormGroup;
  // Output events to communicate back to the dashboard layout
  cancel = output<void>();
  productSaved = output<any>();

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      sku: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      // Validates to match the C# [Range(0.01, ...)]
      price: [null, [Validators.required, Validators.min(0.01)]],
      categoryId: [null, [Validators.required]]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      console.log('Dispatching DTO to backend:', this.productForm.value);
      this.productService.addProduct(this.productForm.value).subscribe({
      next: (response) => {
        console.log('Success!', response);
      },
      error: (err) => console.error('Error adding product', err)
    });
      this.productSaved.emit(this.productForm.value);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
