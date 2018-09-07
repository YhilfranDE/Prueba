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
  items : any;

  constructor(public navCtrl: NavController, 
              private auth: Service,
              public alertCtrl: AlertController){

    this.Books();
    this.showAlert();
    
  }

  Books(){
   let info = this.auth.getUserInfo();
   let rut;
   let string = '';
   let json_bk :any;
   let i = 0;

    //console.log('informacion:', info);
    this.firstName = info['firstName'];
    this.lastName = info['lastName'];
    this.email = info['email'];
    this.token = info['token'];

   rut = this.auth.getBookings(this.token, this.email, this.email2);
    rut.subscribe(res => {
        let data = res.json();
        this.bookings = data;
        //console.log("libros",this.bookings);
        this.bookings.forEach(x =>{
          
          json_bk = JSON.parse(x.bookingFields);
          this.bookings[i]['firstName'] = json_bk.firstName;
          this.bookings[i]['lastName'] = json_bk.lastName;
          i++;

        }); 
        // console.log(i);
        // console.log("libros_ modificados",this.bookings);
        this.initializeItems();   

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

  initializeItems() {

    this.items = this.bookings;
    //console.log("desde initialize:", this.items);
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems()

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((book) => {
        book.bookingId = ''+book.bookingId;
        return (book.bookingId.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }




}
