import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/user.model';
import { SearchesService } from 'src/app/services/searches.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  public users!: User[];
  public hospitals!: Hospital[];
  public doctors!: Doctor[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: SearchesService
  ) {}

  ngOnInit(): void {
    const { term } = this.activatedRoute.snapshot.params;
    this.searchAtAll(term);
  }

  searchAtAll(term: string) {
    this.searchService.searchAtALL(term).subscribe({
      next: (data: any) => {
        
        const { users, hospitals, doctors } = data.response;

        this.users = users;
        this.hospitals = hospitals;
        this.doctors = doctors;
        
      }
    })
  }

}
