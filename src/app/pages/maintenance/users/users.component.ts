import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ModalImgService } from 'src/app/services/modal-img.service';
import { SearchesService } from 'src/app/services/searches.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit, OnDestroy {

  public users: User[] = [];
  public usersTemp: User[] = [];
  public totalUsers: number = 0;
  public from: number = 0;
  public loading: boolean = false;
  public imgSubs!: Subscription;

  constructor(
    private userService: UserService,
    private searchService: SearchesService,
    public modalService: ModalImgService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    // it subscribes to event emitter from modal-img component
    this.imgSubs = this.modalService.imgHasChanged.subscribe({
      next: (response: string) => this.getUsers()
    })
  }

  // Terminar la suscripción o escucha del event emitter y evitar fugas de memoria.
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  changePage(from: number) {
    this.from += from;

    if (this.from < 0) {
      this.from = 0;
    } else if (this.from > this.totalUsers) {
      this.from -= from;
    }

    this.getUsers();

  }

  getUsers() {
    this.loading = true;
    this.userService.getUsers(this.from, 5).subscribe({
      next: ({ total, users }) => {
        this.loading = false;
        this.totalUsers = total;
        if (users.length !== 0) {
          this.users = users;
          this.usersTemp = users;
        }
      }
    })
  }

  search(term: string) {
    if (term !== '') {
      this.searchService.search('users', term).subscribe({
        next: (data) => {
          this.users = data;
        }
      })
    } else {
      this.users = this.usersTemp;
    }
  }

  deleteUser(user: User) {

    if (user.uid === this.userService.getUUID) {
      Swal.fire('Error', 'You can`t delete yourself', 'error')
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete to ${user.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user).subscribe({
          next: (response) => {
            Swal.fire('User deleted', `${user.name} has been deleted`, 'success')
            this.getUsers()
          }
        });
      }
    })
  }

  changeRole(user: User) {
    console.log(user);
    this.userService.changeRole(user).subscribe({
      next: (response) => console.log(response)
    })
  }

  openModal(user: User) {
    this.modalService.openModal('users', user.uid!, user.img);
  }

}
