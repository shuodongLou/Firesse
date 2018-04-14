import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the SearchmemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searchmember',
  templateUrl: 'searchmember.html',
})
export class SearchmemberPage {

  public items = [];
  public perItems = [];
  public param:any;

  constructor(public navCtrl: NavController,
              public auth: AuthProvider,
              public loadingCtrl: LoadingController,
              public navParams: NavParams) {
    this.param = this.navParams.get('param');
    let loading = this.loadingCtrl.create({
      content: '载入中...'
    });
    loading.present();
    this.auth.getAccountList().then((res) => {
      console.log('account list: ', res);
      for (let i = 0; i < (<any>res).length; i++) {
        if (res[i]['username'] != '') {
          this.items.push(res[i]);
        }
      }
      this.perItems = this.items;
      console.log('items: ', this.items);
      loading.dismiss();
    }).catch((err) => {
      console.log('err: in searchmember getAccountlist() - err ', err);
      loading.dismiss();
    });
  }



  getItems(ev) {
    // Reset items back to all of the items
    this.items = this.perItems;
    // set val to the value of the ev target
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item['username'].toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  gotoProfile(account) {
    console.log('in gotoProfile - account: ', account);
    if (this.param == 'records') {
      this.navCtrl.push("PatientrecordPage", { 'account': account });
    } else if (this.param == 'accounts') {
      console.log('going to AccountdetailsPage');
      this.navCtrl.push('AccountadminPage', { 'account': account });
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchmemberPage');
  }

}
