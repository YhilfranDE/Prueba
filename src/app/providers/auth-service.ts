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
export class AuthService {
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
        headers.append('app', 'APP_WEB');
        headers.append('Accept', 'application/json');
        //console.log("desde:", Datas);
        this.http.put(this.url+Datas.email, null, {headers: headers})
          .subscribe(res => {
            let data = res.json();
            this.currentUser = new User(data.firstName, data.lastName, data.email, data.sessionTokenWeb);
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

  public getBookings(token,email){

      let url: String = "https://dev.tuten.cl/TutenREST/rest/booking/";
      let page = 0;
      let pagesize = 0;        
      let bookings = new Headers();
      bookings.append('Content-Type', 'application/json');
      bookings.append('token', token);
      bookings.append('app', 'APP_WEB');
      bookings.append('Accept', 'application/json');    
      return this.http.get(url+email+"/all?current=true&page="+page+"&pagesize="+pagesize, {headers: bookings});      
  }


  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

}
