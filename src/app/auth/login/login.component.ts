import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  // Reference HTML Element
  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService) {

    this.loginForm = formBuilder.group({
      email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: false
    })

  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {

    google.accounts.id.initialize({
      client_id: "500414308541-trg06d07n4i2n0cjkgie4fob0a06s4p0.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
    
  }

  handleCredentialResponse(response:any) {
    this.userService.loginGoogle(response.credential).subscribe({
      next: (response) => this.router.navigateByUrl('/')
    })
  }

  login() {
    this.userService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        if (response.ok) {
          this.remember()
          this.router.navigateByUrl('/')
        }
      },
      error: (err) => Swal.fire('Error', err.error.message, 'error')
    })
  }

  remember() {
    const remember = this.loginForm.get('remember');
    if (remember?.value) {
      const email = this.loginForm.get('email')?.value;
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('email');
    }
  }

}
