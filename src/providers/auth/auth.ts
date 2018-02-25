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
  //public isLoggedIn=false;
  //public role: any;
  //public pk: any;

  constructor(public http: HttpClient, public storage: Storage) {
  }

  createAccount(details){
      return new Promise((resolve, reject) => {
          let headers = new HttpHeaders().set('Content-Type', 'application/json');
          this.http.post('http://192.168.1.110:8000/create_account/', JSON.stringify(details), {headers})
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
          this.http.post('http://192.168.1.110:8000/custom-token-auth/', JSON.stringify(credentials), {headers})
              .subscribe(res => {
                  console.log(res);
                  this.storage.set('token', res['token']);
                  this.storage.set('role', res['role']);
                  console.log('role set: ', res['role']);
                  this.storage.set('pk', res['pk']);
                  this.storage.set('isLoggedIn', true);
                  //this.isLoggedIn = true;
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
      this.storage.set('role', '');
      this.storage.set('isLoggedIn', false);
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
          this.http.get('http://192.168.1.110:8000/accounts/' + pk, {headers})
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
          this.http.put('http://192.168.1.110:8000/accounts/' + pk, JSON.stringify(details), {headers})
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

  uploadImg(photoReq) {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let tokenStr = 'Token ' + value;
        let headers = new HttpHeaders().set('Authorization', tokenStr).set('Content-Type', 'application/json');
        this.http.post('http://192.168.1.110:8000/storeimg/', JSON.stringify(photoReq), {headers})
          .subscribe(res => {
            console.log('image uploaded successfully - res: ', res);
            resolve(res);
          }, (err) => {
            console.log('image upload failed... err: ', err);
            reject(err);
          });
      });
    });
  }

  createInquiry(details) {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let tokenStr = 'Token ' + value;
        let headers = new HttpHeaders().set('Authorization', tokenStr).set('Content-Type', 'application/json');
        this.http.post('http://192.168.1.110:8000/inquiries/', JSON.stringify(details), {headers})
          .subscribe(res => {
            console.log('Inquiry sent successfully - res: ', res);
            resolve(res);
          }, (err) => {
            console.log('Inquiry failed - err: ', err);
            reject(err);
          });
      });
    });
  }

  getInquiriesForUser(acc_id) {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let tokenStr = 'Token ' + value;
        let headers = new HttpHeaders().set("Authorization", tokenStr);
        this.http.get('http://192.168.1.110:8000/inquiriesforuser/' + acc_id, {headers})
          .subscribe(res => {
            console.log('got res for user - res: ', res);
            resolve(res);
          }, (err) => {
            console.log("Err, inquiriesforuser request failed - err: ", err);
            reject(err);
          });
      });
    });
  }

  getUnresolvedInquiries() {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let tokenStr = 'Token ' + value;
        let headers = new HttpHeaders().set("Authorization", tokenStr);
        this.http.get('http://192.168.1.110:8000/unresolvedinquiries/', {headers})
          .subscribe(res => {
            console.log('got res for user - res: ', res);
            resolve(res);
          }, (err) => {
            console.log("Err, getUnresolvedInquiries request failed - err: ", err);
            reject(err);
          });
      });
    });
  }


  getPhotoByInquiryId(inq_id) {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let tokenStr = 'Token ' + value;
        let headers = new HttpHeaders().set('Authorization', tokenStr);
        console.log('in auth - id obj: ', inq_id);
        this.http.get('http://192.168.1.110:8000/getphotobyinquiryid/' + inq_id, {headers})
          .subscribe((res) => {
            console.log('got photos by inquiry id - res: ', res);
            resolve(res);
          }, (err) => {
            console.log('Err, getPhotoByInquiryId request failed - err: ', err);
            reject(err);
          });
      });
    });
  }

  updateInquiry(reqPack) {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let tokenStr = 'Token ' + value;
        let headers = new HttpHeaders().set('Authorization', tokenStr).set('Content-Type', 'application/json');
        let pk = reqPack['id'];
        console.log('inq_id is ', pk);
        console.log('reqObj: ', reqPack['reqObj']);
        this.http.put('http://192.168.1.110:8000/inquiries/' + pk, JSON.stringify(reqPack['reqObj']), {headers})
          .subscribe((res) => {
            console.log('updated inquiry successfully - res: ', res);
            resolve(res);
          }, (err) => {
            console.log('Err, updateInquiry() request failed - err: ', err);
            reject(err);
          });
      });
    });
  }

}
