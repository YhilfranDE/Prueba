import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';


export class User {
  firstName: string;
  lastName: string;
  email: string;
  token: string;

  constructor(firstName: string, lastName: string, email: string, token: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.token = token;
  }
}


@Injectable()
export class Service {
  currentUser: User;
  url: String = "https://dev.tuten.cl/TutenREST/rest/user/";

  constructor(public http: Http) {}


   public login(Datas) {
    if (Datas.email === null || Datas.pass === null) {
      return Observable.throw("Faltan credenciales");
    } else {
      return Observable.create(observer => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('password', Datas.pass);
        headers.append('app', 'APP_BCK');
        headers.append('Accept', 'application/json');
        //console.log("desde:", Datas);
        this.http.put(this.url+Datas.email, null, {headers: headers})
          .subscribe(res => {
            let data = res.json();
            console.log('desde obtener los datos', data);
            this.currentUser = new User(data.firstName, data.lastName, data.email, data.sessionTokenBck);
            observer.next(true);
            observer.complete();
          }, (err) => {
            console.log(err);
            observer.next(false);
            observer.complete();
      });
          });
    }
  }


  public getUserInfo() : User {
    //console.log(this.currentUser);
    return this.currentUser;
  }

  public getBookings(token,email,email2){
     
      let url: String = "https://dev.tuten.cl/TutenREST/rest/user/";       
      let bookings = new Headers();
      bookings.append('token', 'testapis@tuten.clgfi92od081050c93dhgelu403d');
      bookings.append('app', 'APP_BCK');
      bookings.append('adminemail', email);
      //console.log(url+email+"/bookings?current=true");
      return this.http.get(url+email2+"/bookings", {headers: bookings}); 


  }


  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

}
