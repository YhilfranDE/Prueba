var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Service } from '../../services/service';
import { Login } from '../login/login';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, auth) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.auth = auth;
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.token = '';
        this.email2 = 'contacto@tuten.cl';
        var rut;
        var info = this.auth.getUserInfo();
        console.log('informacion:', info);
        this.firstName = info['firstName'];
        this.lastName = info['lastName'];
        this.email = info['email'];
        this.token = info['token'];
        rut = this.auth.getBookings(this.token, this.email);
        rut.subscribe(function (res) {
            var data = res.json();
            _this.bookings = data.bookings;
            console.log("libros", _this.bookings);
        }, function (err) {
            console.log(err);
        });
    }
    HomePage.prototype.logout = function () {
        var _this = this;
        this.auth.logout().subscribe(function (succ) {
            _this.navCtrl.setRoot(Login);
        });
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController, Service])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map