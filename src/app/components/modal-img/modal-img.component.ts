import { Component, EventEmitter, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImgService } from 'src/app/services/modal-img.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html'
})
export class ModalImgComponent implements OnInit {

  public imgTemp: any = null;
  public uploadImg!: File;

  constructor(
    public modalService: ModalImgService,
    public fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
  }

  closeModal() {
    this.imgTemp = null;
    this.modalService.closeModal();
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
    this.fileUploadService.updateImg(this.uploadImg, this.modalService.type, this.modalService.id)
    .then(img => {
      Swal.fire('Updated!', 'File updated', 'success');
      // emit new image path after has been updated
      this.modalService.imgHasChanged.emit(img);
      this.closeModal();
    })
    .catch(err => Swal.fire('Error', err.error.message, 'error'))
  }

}
