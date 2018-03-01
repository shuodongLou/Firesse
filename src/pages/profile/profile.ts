import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, LoadingController } from 'ionic-angular';
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

  public role: any;
  public pk: any;

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
              public loadingCtrl: LoadingController,
              public storage: Storage) {

    let loading = this.loadingCtrl.create({
      content: '载入中...'
    });
    loading.present();
    this.auth.retrieveAccountDetails().then((res) => {
      console.log("getting account details...");
      console.log(res);
      this.user = res['user'];
      this.date = res['birthday'];
      this.sex = res['sex'];
      console.log(this.user);
      loading.dismiss();
    }).catch((err) => {
      console.log('profile.ts - retrieveAccountDetails - err: ', err);
      loading.dismiss();
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


      let details = {
        birthday: isoDate,
        role: this.role,
        user: this.user
      }
      this.auth.updateAccountDetails(details).then((res) => {
        console.log("updated in profile...");
      }, (err) => {
        console.log('failed update in profile...');
      });

  }

  updateSex() {
    console.log('sex updating...');
    console.log(this.sex);

      let details = {
        sex: this.sex,
        role: this.role,
        user: this.user
      }
      this.auth.updateAccountDetails(details).then((res) => {
        console.log("updated in profile...");
      }, (err) => {
        console.log('failed update in profile...');
      });

  }

  gotoInquiries() {
    this.navCtrl.push("InquiryPage", { 'acc_id': this.pk });
  }

  ionViewWillEnter() {
    this.storage.get('role').then((value) => {
      this.role = value;
    });
    this.storage.get('pk').then((value) => {
      this.pk = value;
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
