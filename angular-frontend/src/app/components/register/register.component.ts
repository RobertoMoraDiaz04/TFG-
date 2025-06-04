import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // ajusta el path si es necesario
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  register(event: Event) {
    event.preventDefault();
    this.error = null;

    if (this.registerForm.valid) {
      const { email, password, confirmPassword } = this.registerForm.value;

      if (password !== confirmPassword) {
        this.error = 'Las contraseñas no coinciden';
        return;
      }

      this.authService.register(email, password).subscribe({
        next: () => {
          //redirigir al login después de registrar
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.error = 'Error al registrar. Intenta con otro correo.';
          console.error(err);
        }
      });
    }
  }
}
