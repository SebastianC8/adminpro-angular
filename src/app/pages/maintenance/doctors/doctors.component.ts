import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { ModalImgService } from 'src/app/services/modal-img.service';
import { SearchesService } from 'src/app/services/searches.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html'
})
export class DoctorsComponent implements OnInit, OnDestroy {

  public doctors: Doctor[] = [];
  public doctorsTmp: Doctor[] = [];
  public loading: boolean = false;
  public imgSubs!: Subscription;

  constructor(
    private doctorService: DoctorService,
    private modalImgService: ModalImgService,
    private searchService: SearchesService
  ) { }

  ngOnInit(): void {
    this.getDoctors();
    this.imgSubs = this.modalImgService.imgHasChanged.subscribe({
      next: (response: any) => this.getDoctors()
    })
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  getDoctors() {
    this.loading = true;
    this.doctorService.getDoctors().subscribe({
      next: (response) => {
        this.loading = false;
        this.doctors = response;
        this.doctorsTmp = response;
      }
    })
  }

  deleteDoctor(doctor: Doctor) {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete to ${doctor.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorService.deleteDoctor(doctor._id!).subscribe({
          next: (response) => {
            Swal.fire('OK', 'This doctor has been deleted', 'success')
            this.getDoctors();
          }
        })

      }
    });
  }

  openModal(doctor: Doctor) {
    this.modalImgService.openModal('doctors', doctor._id!, doctor.img)
  }

  search(term: string) {
    if (term !== '') {
      this.searchService.search('doctors', term).subscribe({
        next: (response) => this.doctors = response
      })
    } else {
      this.doctors = this.doctorsTmp;
    }
  }

}
