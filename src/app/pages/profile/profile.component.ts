import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit
{

  public profileForm!: FormGroup;
  public user!: User;
  public uploadImg!: File;
  public imgTemp: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService
  ) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]]
    })
  }

  updateProfile() {
    this.userService.updateProfile(this.profileForm.value)
    .subscribe({
      next: (response: any) => {
        this.user.name = response?.user?.name;
        this.user.email = response?.user?.email;
        Swal.fire('Actualizado', 'Información del perfil actualizada', 'success')
      },
      error: (err) => Swal.fire('Error', err.error.message, 'error')
    })
  }

  selectImg(event: any) {

    this.uploadImg = event.target?.files[0];
    
    if (!this.uploadImg) { 
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.uploadImg);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

    return true;
  }
  
  uploadFile() {
    this.fileUploadService.updateImg(this.uploadImg, 'users', this.user.uid!)
    .then(img => {
      this.user.img = img;
      Swal.fire('Updated!', 'File updated', 'success');
    })
    .catch(err => Swal.fire('Error', err.error.message, 'error'))
  }

}
