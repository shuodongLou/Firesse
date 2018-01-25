import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';

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

  public date='2000-01-10'
  public accountDetails: any
  public user: any

  constructor(public navCtrl: NavController,
              public modelCtrl: ModalController,
              public auth: AuthProvider,
              public storage: Storage) {

    this.auth.retrieveAccountDetails().then((res) => {
      console.log("getting account details...");
      console.log(res);
      this.user = res['user'];
      this.date = res['birthday'];
      console.log(this.user);
    }, (err) => {
      console.log("failed to get account details...");
    });
  }

  presentAddressModal() {
    console.log('something');
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
