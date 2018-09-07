var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
var User = /** @class */ (function () {
    function User(firstName, lastName, email, token) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.token = token;
    }
    return User;
}());
export { User };
var Service = /** @class */ (function () {
    function Service(http) {
        this.http = http;
        this.url = "https://dev.tuten.cl/TutenREST/rest/user/";
    }
    Service.prototype.login = function (Datas) {
        var _this = this;
        if (Datas.email === null || Datas.pass === null) {
            return Observable.throw("Faltan credenciales");
        }
        else {
            return Observable.create(function (observer) {
                var headers = new Headers();
                headers.append('Content-Type', 'application/json');
                headers.append('password', Datas.pass);
                headers.append('app', 'APP_BCK');
                headers.append('Accept', 'application/json');
                //console.log("desde:", Datas);
                _this.http.put(_this.url + Datas.email, null, { headers: headers })
                    .subscribe(function (res) {
                    var data = res.json();
                    console.log('desde obtener los datos', data);
                    _this.currentUser = new User(data.firstName, data.lastName, data.email, data.sessionTokenBck);
                    observer.next(true);
                    observer.complete();
                }, function (err) {
                    console.log(err);
                    observer.next(false);
                    observer.complete();
                });
            });
        }
    };
    Service.prototype.getUserInfo = function () {
        //console.log(this.currentUser);
        return this.currentUser;
    };
    Service.prototype.getBookings = function (token, email) {
        email = 'contacto@tuten.cl';
        var url = "https://dev.tuten.cl/TutenREST/rest/user/";
        var bookings = new Headers();
        //bookings.append('Content-Type', 'application/json');
        bookings.append('token', 'testapis@tuten.clgfi92od081050c93dhgelu403d');
        bookings.append('app', 'APP_BCK');
        bookings.append('adminemail', 'testapis@tuten.cl');
        //console.log(url+email+"/bookings?current=true");
        return this.http.get(url + email + "/bookings", { headers: bookings });
    };
    Service.prototype.logout = function () {
        var _this = this;
        return Observable.create(function (observer) {
            _this.currentUser = null;
            observer.next(true);
            observer.complete();
        });
    };
    Service = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], Service);
    return Service;
}());
export { Service };
//# sourceMappingURL=service.js.map