import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  public token: any;
  public isLoggedIn: boolean;
  public role: any;
  public pk: any;

  constructor(public http: HttpClient, public storage: Storage) {

  }

  checkAuthentication() {
    console.log("in checkAuthentication");
    return new Promise((resolve, reject) => {
      console.log("before storage.get");
      this.storage.get('token').then((value) => {
        console.log("in storage.get");
        if (value == null) {
          console.log("value is null...");
          this.token = "jdsf023jioj09fdsjj3k12j9";
        } else {
          this.token = value;
        }
        console.log("before let headers");
        let headers = new HttpHeaders().set("Authorization", "Token "+this.token);
        console.log("before headers.append");
        //headers.append('Authorization: Token ', this.token);

        console.log("before sending GET");
        this.http.get('http://localhost:8000/protected_auth/', {headers})
          .subscribe(res => {
            resolve(res);
            console.log("resolving res...");
          }, (err) => {
            reject(err);
            console.log("rejecting err...");
          });
      });
    });
  }

  createAccount(details){
      return new Promise((resolve, reject) => {
          let headers = new HttpHeaders().set('Content-Type', 'application/json');
          this.http.post('http://localhost:8000/create_account/', JSON.stringify(details), {headers})
              .subscribe(res => {
                  console.log(res);
                  resolve(res);
              }, (err) => {
                  reject(err);
              });
      });
  }

  login(credentials){
      return new Promise((resolve, reject) => {
          let headers = new HttpHeaders().set('Content-Type', 'application/json');
          this.http.post('http://localhost:8000/custom-token-auth/', JSON.stringify(credentials), {headers})
              .subscribe(res => {
                  console.log(res);
                  this.storage.set('token', res['token']);
                  this.storage.set('role', res['role']);
                  this.isLoggedIn = true;
                  this.role = res['role'];
                  this.pk = res['pk'];
                  console.log("after storage.set()");

                  resolve(res);
              }, (err) => {
                  reject(err);
              });
      });
  }

  logout(){
      console.log('logout() is called...');
      this.storage.set('token', '');
      this.isLoggedIn = false;
      this.role = '';
      console.log('after storage.set()');
  }

}
