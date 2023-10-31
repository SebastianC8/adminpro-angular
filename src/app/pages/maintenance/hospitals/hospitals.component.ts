import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImgService } from 'src/app/services/modal-img.service';
import { SearchesService } from 'src/app/services/searches.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html'
})
export class HospitalsComponent implements OnInit, OnDestroy {

  public hospitals: Hospital[] = [];
  public hospitalsTemp: Hospital[] = [];
  public loading: boolean = false;
  public imgSubs!: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalImgService: ModalImgService,
    private searchService: SearchesService
  ) {}

  ngOnInit(): void {
    this.getHospitals();
    this.imgSubs = this.modalImgService.imgHasChanged.subscribe({
      next: (response: string) => this.getHospitals()
    })
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  getHospitals() {
    this.loading = true;
    this.hospitalService.getHospitals().subscribe({
      next: (response: Hospital[]) => {
        this.loading = false;
        this.hospitals = response;
        this.hospitalsTemp = response;
      }
    })
  }

  saveChanges(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital._id!, hospital.name).subscribe({
      next: (response) => Swal.fire('OK', 'This hospital has been updated', 'success')
    })
  }

  deleteHospital(uid: string) {
    this.hospitalService.deleteHospital(uid).subscribe({
      next: (response) => {
        Swal.fire('OK', 'This hospital has been deleted', 'success')
        this.getHospitals();
      }
    })
  }

  async openSA_Modal() {
    const { value = '' } = await Swal.fire<string>({
      input: 'text',
      text: "Enter new hospital's name",
      title: "Create hospital",
      inputPlaceholder: 'Hospital name',
      showCancelButton: true
    });

    if (value!.trim().length > 0) {
      this.hospitalService.createHospital(value!).subscribe({
        next: (response: any) => {
          Swal.fire('OK', 'Hospital created!', 'success')
          this.hospitals.push(response.hospital)
        }
      })
    }

  }

  openModal(hospital: Hospital) {
    this.modalImgService.openModal('hospitals', hospital._id!, hospital.img)
  }

  search(term: string) {
    if (term !== '') {
      this.searchService.search('hospitals', term).subscribe({
        next: (response: Hospital[]) => {
          this.hospitals = response;
        }
      }) 
    } else {
      this.hospitals = this.hospitalsTemp;
    }
  }

}
