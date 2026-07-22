import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.html',
})
export class AuthComponent {
  isLoginMode = true;
  authForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the form with empty values and validators
    this.authForm = this.fb.group({
      name: [''], // Initially no validators because default is Login mode
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    const nameControl = this.authForm.get('name');
    
    // require the Name field only during Sign Up
    if (this.isLoginMode) {
      nameControl?.clearValidators();
    } else {
      nameControl?.setValidators([Validators.required]);
    }
    
    nameControl?.updateValueAndValidity();
    this.authForm.reset();
  }

  onSubmit() {
    if (this.authForm.valid) {
      const payload = this.authForm.value;
      
      if (this.isLoginMode) {
        console.log('Signing in with:', payload.email, payload.password);
        // TODO: Call backend sign-in endpoint
      } else {
        console.log('Registering new user:', payload);
        // TODO: Call backend registration endpoint
      }
    }
  }
}