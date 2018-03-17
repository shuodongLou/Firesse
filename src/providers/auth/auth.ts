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

  public server_url = 'http://192.168.1.6:8000/';

  constructor(public http: HttpClient, public storage: Storage) {
  }

  createAccount(details){
      return new Promise((resolve, reject) => {
          let headers = new HttpHeaders().set('Content-Type', 'application/json');
          this.http.post(this.server_url + 'create_account/', JSON.stringify(details), {headers})
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
          this.http.post(this.server_url + 'custom-token-auth/', JSON.stringify(credentials), {headers})
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

  getAccountList() {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let tokenStr = 'Token ' + value;
        let headers = new HttpHeaders().set('Authorization', tokenStr);
        this.http.get(this.server_url + 'accounts', {headers})
          .subscribe((res) => {
            console.log('got account list: ', res);
            resolve(res);
          },  (err) => {
            console.log('ERR: auth - getAccountList - err: ', err);
            reject(err);
          });
      });
    });
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
          this.http.get(this.server_url + 'accounts/' + pk, {headers})
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
          this.http.put(this.server_url + 'accounts/' + pk, JSON.stringify(details), {headers})
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

  updateAccountDetailsById(details, acct_id) {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let tokenStr = 'Token ' + value;
        let headers = new HttpHeaders().set('Authorization', tokenStr).set('Content-Type', 'application/json');
        this.http.put(this.server_url + 'accounts/' + acct_id, JSON.stringify(details), {headers})
          .subscribe(res => {
            console.log('updated successfully - res: ', res);
            resolve(res);
          }, (err) => {
            console.log('update failed... err: ', err);
            reject(err);
          });
      });
    });
  }

  uploadImg(photoReq) {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let tokenStr = 'Token ' + value;
        let headers = new HttpHeaders().set('Authorization', tokenStr).set('Content-Type', 'application/json');
        this.http.post(this.server_url + 'storeimg/', JSON.stringify(photoReq), {headers})
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
        this.http.post(this.server_url + 'inquiries/', JSON.stringify(details), {headers})
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
        this.http.get(this.server_url + 'inquiriesforuser/' + acc_id, {headers})
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
        this.http.get(this.server_url + 'unresolvedinquiries/', {headers})
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
        this.http.get(this.server_url + 'getphotobyinquiryid/' + inq_id, {headers})
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
        this.http.put(this.server_url + 'inquiries/' + pk, JSON.stringify(reqPack['reqObj']), {headers})
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

  getAccidByUser(user_id) {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let tokenStr = 'Token ' + value;
        let headers = new HttpHeaders().set('Authorization', tokenStr);
        this.http.get(this.server_url + 'getaccidbyuser/' + user_id, {headers})
          .subscribe((res) => {
            console.log('got account id: ', res);
            resolve(res);
          }, (err) => {
            console.log('Err, getAccidByUser - err: ', err);
            reject(err);
          });
      });
    });
  }

  createProduct(details) {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let tokenStr = 'Token ' + value;
        let headers = new HttpHeaders().set('Authorization', tokenStr).set('Content-Type', 'application/json');
        this.http.post(this.server_url + 'products/', JSON.stringify(details), {headers})
          .subscribe((res) => {
            console.log('created new product successfully - res: ', res);
            resolve(res);
          }, (err) => {
            console.log('Err, in auth, createProduct - err: ', err);
            reject(err);
          });
      });
    });
  }

  getProductList() {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let tokenStr = 'Token ' + value;
        let headers = new HttpHeaders().set('Authorization', tokenStr);
        this.http.get(this.server_url + 'products/', {headers})
          .subscribe((res) => {
            console.log('got product list - res: ', res);
            resolve(res);
          }, (err) => {
            console.log('Err, in auth, getProductList - err: ', err);
            reject(err);
          });
      });
    });
  }

  updateProduct(reqPack) {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let tokenStr = 'Token ' + value;
        let headers = new HttpHeaders().set('Authorization', tokenStr).set('Content-Type', 'application/json');
        this.http.put(this.server_url + 'products/' + reqPack['id'], JSON.stringify(reqPack['product']), {headers})
          .subscribe((res) => {
            console.log('updated product successfully - res: ', res);
            resolve(res);
          }, (err) => {
            console.log('Err, in auth updateProduct - err: ', err);
            reject(err);
          });
      });
    });
  }

  uploadProductImages(imgReq) {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let tokenStr = 'Token ' + value;
        let headers = new HttpHeaders().set('Authorization', tokenStr).set('Content-Type', 'application/json');
        this.http.post(this.server_url + 'productimages/', JSON.stringify(imgReq), {headers})
          .subscribe((res) => {
            console.log('uploaded images for product successfully');
            resolve(res);
          }, (err) => {
            console.log('Err, in auth uploadProductImages - err: ', err);
            reject(err);
          });
      });
    });
  }

  getProductImageListByProduct(product_id) {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let tokenStr = 'Token ' + value;
        let headers = new HttpHeaders().set('Authorization', tokenStr);
        this.http.get(this.server_url + 'productimages/' + product_id, {headers})
          .subscribe((res) => {
            console.log('got product image paths for product successfully - res', res);
            resolve(res);
          }, (err) => {
            console.log('Err, in auth getProductImageListByProduct - err: ', err);
            reject(err);
          });
      });
    });
  }

  deleteProductImage(img_id) {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let tokenStr = 'Token ' + value;
        let headers = new HttpHeaders().set('Authorization', tokenStr);
        this.http.delete(this.server_url + 'productimagesops/' + img_id, {headers})
          .subscribe((res) => {
            console.log('deleted successfully - res', res);
            resolve(res);
          }, (err) => {
            console.log('Err, in auth deleteProductImage - err: ', err);
            reject(err);
          });
      });
    });
  }

  createAgent(details) {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let tokenStr = 'Token ' + value;
        let headers = new HttpHeaders().set('Authorization', tokenStr).set('Content-Type', 'application/json');
        this.http.post(this.server_url + 'agents/', JSON.stringify(details), {headers})
          .subscribe((res) => {
            console.log('new agent created successfully - res: ', res);
            resolve(res);
          }, (err) => {
            console.log('Err, in auth createAgent - err: ', err);
            reject(err);
          });
      });
    });
  }

  getAgentsByAccount(acct_id) {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let tokenStr = 'Token ' + value;
        let headers = new HttpHeaders().set('Authorization', tokenStr);
        this.http.get(this.server_url + 'agentsbyaccount/' + acct_id, {headers})
          .subscribe((res) => {
            console.log('got agents by acct_id - res: ', res);
            resolve(res);
          }, (err) => {
            console.log('Err, in auth getAgentsByAccount - err: ', err);
            reject(err);
          });
      });
    });
  }

  deleteAgent(agent_id) {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let tokenStr = 'Token ' + value;
        let headers = new HttpHeaders().set('Authorization', tokenStr);
        this.http.delete(this.server_url + 'agents/' + agent_id, {headers})
          .subscribe((res) => {
            console.log('deleted agent - res: ', res);
            resolve(res);
          }, (err) => {
            console.log('Err, in auth deleteAgent - err: ', err);
            reject(err);
          });
      });
    });
  }

  hasFirecode(fire_code) {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        let tokenStr = 'Token ' + value;
        let headers = new HttpHeaders().set('Authorization', tokenStr).set('Content-Type', 'application/json');
        this.http.post(this.server_url + 'hasfirecode/', JSON.stringify(fire_code), {headers} )
          .subscribe((res) => {
            console.log('has fire code');
            resolve(res);
          }, (err) => {
            console.log('there is no such fire code');
            reject(err);
          });
      });
    });
  }

}
