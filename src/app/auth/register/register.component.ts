import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public registerForm: FormGroup;
  public formSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) {

    this.registerForm = formBuilder.group({
      name: ['Sebastián', [Validators.required, Validators.minLength(3)]],
      email: ['scorraless100@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
      passwordTwo: ['1234567', [Validators.required]],
      terms: [false, [Validators.required, Validators.requiredTrue]]
    }, {
      validators: this.areEqualsPasswords()
    });

  }

  createUser() {
    
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.userService.createUser(this.registerForm.value)
    .subscribe({
      next: (response) => this.router.navigateByUrl('/'),
      error: (err) => Swal.fire('Error', err.error.message, 'error')
    })

  }

  IsFieldValid(field: string): boolean {
    if (this.registerForm.get(field)?.invalid && this.formSubmitted) {
      return false;
    } else {
      return true;
    }
  }

  areEqualsPasswords() {
    return (formGroup: FormGroup) => {
      const password = formGroup.get('password');
      const passwordTwo = formGroup.get('passwordTwo')!;
      if (password?.value === passwordTwo?.value) {
        passwordTwo.setErrors(null);
      } else {
        passwordTwo.setErrors({ areNotTheSame: true });
      }
    }
  }

  validPassword = () => {
    const password = this.registerForm.get('password')?.value;
    const passwordTwo = this.registerForm.get('passwordTwo')?.value;
    return (password === passwordTwo) ? true : false;
  }

}
