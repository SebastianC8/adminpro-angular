import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {

  public formDoctor!: FormGroup;
  public hospitals!: Hospital[];
  public selectedHospital: any;
  public selectedDoctor!: Doctor;

  constructor(
    private formBuilder: FormBuilder,
    private hospitalService: HospitalService,
    private doctorService: DoctorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.getHospitals();
    this.getDoctor();

    this.formDoctor = this.formBuilder.group({
      name: [, Validators.required],
      hospital: ['', Validators.required]
    });

    this.formDoctor.get('hospital')?.valueChanges.subscribe({
      next: (hospital_id: string) => {
        this.selectedHospital = this.hospitals.find((hospital) => hospital._id === hospital_id);
      }
    })

  }

  saveDoctor() {
    if (this.selectedDoctor) {

      const data = {
        ...this.formDoctor.value,
        _id: this.selectedDoctor._id
      }

      this.doctorService.updateDoctor(data).subscribe({
        next: (response) => {
          console.log(response);
          Swal.fire('OK', 'Doctor updated!', 'success');
        }
      });

    } else {

      const { name, hospital } = this.formDoctor.value;
      this.doctorService.createDoctor({ name, hospital }).subscribe({
        next: (response: any) => {
          Swal.fire('OK', 'Doctor created!', 'success');
          this.router.navigateByUrl(`/dashboard/doctors`)
        }
      })

    }
  }

  getHospitals() {
    this.hospitalService.getHospitals().subscribe({
      next: (response) => this.hospitals = response
    })
  }

  getDoctor() {
    this.activatedRoute.params.subscribe({
      next: ({ id }) => {
        if (id !== 'new') {
          this.doctorService.getDoctor(id)
          .pipe(delay(100))
          .subscribe({
            next: (response) => {

              if (!response) {
                return this.router.navigateByUrl(`/dashboard/doctor/${response.doctor._id}`);
              }

              const { name, hospital: { _id } } = response;
              this.formDoctor.setValue({ name, hospital: _id })
              this.selectedDoctor = response

              return true;
            }
          })
        }
      }
    })
  }

}
