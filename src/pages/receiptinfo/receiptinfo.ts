import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { AddressProvider } from '../../providers/address/address';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ReceiptinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receiptinfo',
  templateUrl: 'receiptinfo.html',
})
export class ReceiptinfoPage {

  public role:any;

  public addressColumns: any;
  public currentAddress='';
  public name='';
  public phone='';
  public detailedAddress='';

  public province: any;
  public city: any;
  public county: any;
  public user: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public address: AddressProvider,
              public auth: AuthProvider,
              public storage: Storage,
              public loading: LoadingController,
              public viewCtrl: ViewController) {

    //setup multiPickerColumns for addresses
    this.addressColumns = this.address.addresses;

    let loading = this.loading.create({
      content: '载入中...'
    });
    loading.present();
    this.auth.retrieveAccountDetails().then((res) => {
      console.log("getting account details...");
      console.log(res);
      this.user = res['user'];
      this.phone = res['phone'];
      this.name = res['name'];
      this.detailedAddress = res['address'];
      this.province = res['province'];
      this.city = res['city'];
      this.county = res['county'];
      this.currentAddress = this.province + ' ' + this.city + ' ' + this.county;
      loading.dismiss();
    }).catch((err) => {
      console.log('receiptinfo.ts - retrieveAccountDetails - err: ', err);
      loading.dismiss();
    });
    console.log('currentAddress: ', this.currentAddress);
  }

  refreshAddress() {
    console.log('in refreshAddress()');
    console.log(this.currentAddress);
    let addrArray = this.currentAddress.split(' ');
    console.log(addrArray);
    this.province = addrArray[0];
    this.city = addrArray[1];
    this.county = addrArray[2];
  }

  updateReceiptinfo() {

      let details = {
        role: this.role,
        user: this.user,
        province: this.province,
        city: this.city,
        county: this.county,
        address: this.detailedAddress,
        name: this.name,
        phone: this.phone
      }
      
      this.auth.updateAccountDetails(details).then((res) => {
        console.log("updated in profile...");
        this.viewCtrl.dismiss();
      }).catch((err) => {
        console.log('ERR: receiptinfo.ts - updateAccountDetails - err: ', err);
      });

  }

  iscomplete() {
    if (this.name == '' || this.phone == '' || this.detailedAddress == '' || this.currentAddress == '') {
      return false;
    } else {
      return true;
    }
  }

  ionViewWillEnter() {
    this.storage.get('role').then((value) => {
      this.role = value;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptinfoPage');
  }

  dismiss() {
    console.log('before alert');
    let alert = this.alertCtrl.create({
      message: '您确定放弃此次编辑吗？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
        },
        {
          text: '确定',
          handler: () => {
            console.log('confirmed...');
            this.viewCtrl.dismiss();
          }
        }
      ]
    });
    console.log('after alert');
    alert.present();
  }

}
