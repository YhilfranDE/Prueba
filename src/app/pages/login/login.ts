import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading} from 'ionic-angular';
import { Service } from '../../services/service';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  loading: Loading;
  registerDatas = { email: '', pass: '' };

 constructor(private nav: NavController, private auth: Service, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  public login() {
    this.showLoading()
    this.auth.login(this.registerDatas).subscribe(allowed => {
      if (allowed) {
        this.nav.setRoot(HomePage);
      } else {
        this.showError("Email o Password incorrectos");
      }
    },
      error => {
        this.showError(error);
      });
  }

}
