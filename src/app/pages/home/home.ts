import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Service } from '../../services/service';
import { Login } from '../login/login';
import { Http, Headers } from '@angular/http';
import { AlertController } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public bookings: any;
  firstName = '';
  lastName = '';
  email = '';
  token = '';
  email2 = 'contacto@tuten.cl';

  constructor(public navCtrl: NavController, 
              private auth: Service,
              public alertCtrl: AlertController){

    let rut;
    let info = this.auth.getUserInfo();
    console.log('informacion:', info);
    this.firstName = info['firstName'];
    this.lastName = info['lastName'];
    this.email = info['email'];
    this.token = info['token'];

    setTimeout(function(data){
     console.log("hola desde el tiempo");   
    },2000);
     this.showAlert();
     rut = this.auth.getBookings(this.token, this.email, this.email2);
      rut.subscribe(res => {
          let data = res.json();
          this.bookings = data;
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

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Bienvenido!',
      subTitle:this.firstName+' '+this.lastName,
      buttons: ['OK']
    });
    alert.present();
  }
  
}
