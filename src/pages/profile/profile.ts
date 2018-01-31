import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';
import { ReceiptinfoPage } from '../receiptinfo/receiptinfo';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public date: any;
  public accountDetails: any;
  public user: any;
  public sex: any;
  public phone: any;
  public name: any;
  public address: any;
  public province: any;
  public city: any;
  public county: any;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public auth: AuthProvider,
              public storage: Storage) {

    this.auth.retrieveAccountDetails().then((res) => {
      console.log("getting account details...");
      console.log(res);
      this.user = res['user'];
      this.date = res['birthday'];
      this.sex = res['sex'];
      console.log(this.user);
    }, (err) => {
      console.log("failed to get account details...");
    });
  }

  presentAddressModal() {
    console.log('in presentAddressModal()');
    let modal = this.modalCtrl.create(ReceiptinfoPage);
    modal.present();
  }

  updateBirthday() {
    console.log('birthday updating...');
    console.log(this.date);
    let isoDate = this.date;
    this.storage.get('role').then((value) => {

      let details = {
        birthday: isoDate,
        role: value,
        user: this.user
      }
      this.auth.updateAccountDetails(details).then((res) => {
        console.log("updated in profile...");
      }, (err) => {
        console.log('failed update in profile...');
      });
    });
  }

  updateSex() {
    console.log('sex updating...');
    console.log(this.sex);
    this.storage.get('role').then((value) => {

      let details = {
        sex: this.sex,
        role: value,
        user: this.user
      }
      this.auth.updateAccountDetails(details).then((res) => {
        console.log("updated in profile...");
      }, (err) => {
        console.log('failed update in profile...');
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
