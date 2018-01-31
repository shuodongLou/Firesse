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

  //public token: any;
  public isLoggedIn=false;
  //public role: any;
  //public pk: any;

  constructor(public http: HttpClient, public storage: Storage) {
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
                  this.storage.set('pk', res['pk']);
                  this.isLoggedIn = true;
                  //this.role = res['role'];
                  //this.pk = res['pk'];
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
      this.storage.set('pk', '');
      this.isLoggedIn = false;
      console.log('after storage.set()');
  }

  retrieveAccountDetails() {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        console.log('token: ', value);
        let tokenStr = 'Token ' + value;
        console.log('tokenStr: ', tokenStr);
        let headers = new HttpHeaders().set('Authorization', tokenStr);
        this.storage.get('pk').then((value) => {
          let pk = value;
          console.log('pk: ', pk);
          this.http.get('http://localhost:8000/accounts/' + pk, {headers})
              .subscribe(res => {
                  console.log('got the res obj');
                  resolve(res);
              }, (err) => {
                  reject(err);
              });
        });

      });

    });
  }

  updateAccountDetails(details) {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let tokenStr = 'Token ' + value;
        let headers = new HttpHeaders().set('Authorization', tokenStr).set('Content-Type', 'application/json');
        console.log('Headers: ', headers);
        console.log(headers.getAll('Content-Type'));
        console.log(headers.getAll('Authorization'));
        this.storage.get('pk').then((value) => {
          let pk = value;
          this.http.put('http://localhost:8000/accounts/' + pk, JSON.stringify(details), {headers})
            .subscribe(res => {
              console.log('updated successfully - res: ', res);
              resolve(res);
            }, (err) => {
              console.log('update failed... err: ', err);
              reject(err);
            });
        });
      });
    });
  }

}
