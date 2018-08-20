import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Login } from '../login/login';
import { Http, Headers } from '@angular/http';

export interface Car {
    vin;
    year;
    brand;
    color;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public bookings: any;
  firstName = '';
  lastName = '';

  constructor(public navCtrl: NavController, private auth: AuthService) {
    let rut;
    let info = this.auth.getUserInfo();
    this.firstName = info['firstName'];
    this.lastName = info['lastName'];
    this.email = info['email'];
    this.token = info['token'];

   rut = this.auth.getBookings(this.token, this.email);

    rut.subscribe(res => {
        let data = res.json();  
        this.bookings = data.bookings;
        console.log("libros",this.bookings);

        }, (err) => {
          console.log(err);

        });
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.navCtrl.setRoot(Login)
    });
  }

}
