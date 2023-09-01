import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html'
})
export class PromisesComponent implements OnInit
{

  ngOnInit(): void {
    //this.primerEjemplo();
    this.segundoEjemplo();
  }

  primerEjemplo () {

    const promise = new Promise((resolve, reject) => {
      if (true) {
        resolve("OKK");
      } else {
        reject("Failed");
      }
    });

    promise.then((text) => {
      console.log("Terminó: " + text);
    }).catch((err) => {
      console.log("Error: " + err);
    });

  }

  segundoEjemplo () {
    this.getUsuarios().then((users) => {
      console.log(users);
    });
  }

  getUsuarios() {
    return new Promise((resolve) => {
      fetch("https://reqres.in/api/users?page=2")
      .then((resp) => resp.json())
      .then((body) => resolve(body.data));
    });
  }

}
